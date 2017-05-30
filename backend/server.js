const express = require("express");
const pgp = require("pg-promise")();
const cors = require("cors");
const bodyParser = require("body-parser")
const Promise = require("bluebird");
const config = require("./config")

const app = express();
const db = pgp(config);

app.use(bodyParser.json())
app.use(cors());

app.get("/api/targets", function(req, res, next){
  db.any(`select * from target`)
  .then(targets=>{
    var promises = targets.map(target=>new Promise(function(resolve, reject){
        db.any(`select * from contact where target_id = $1`,target.id)
        .then((contact)=>{
          target.contacts=contact;
          return db.any(`select * from target_quarterly where target_id = $1`, target.id)
        })
        .then((entry)=>{
          target.quarterly=entry;
          resolve();
        })
        .catch((err)=>{reject(err);})
      }))
    Promise.all(promises)
      .then(()=>{
        res.json(targets);
      })
  })
  .catch(next);
})

app.get("/api/target/:id", function(req, res, next){
  let id = req.params.id;
  let singletarget;

  db.one(`select * from target where id = $1`, id)
    .then(target=>{
      singletarget = target;
      singletarget.contacts = [];
      singletarget.quarterly = [];
      return db.any(`select * from contact where target_id = $1`,id)
    })
    .then((contacts)=>{
      contacts.forEach((contact)=>{
        singletarget.contacts.push(contact);
      })
      return db.any(`select * from target_quarterly where target_id = $1`, id)
    })
    .then((entries)=>{
      entries.forEach((entry)=>{
        singletarget.quarterly.push(entry);
      })
      res.json(singletarget);
    })
    .catch(next);
})

app.post("/api/changestatus", function(req, res, next){
  id = req.body.id;
  status = req.body.status;

  db.one(`update target set status = $1 where id = $2 returning *`, [status, id])
  .then((target)=>{
    res.json(target)
  })
  .catch(next)
})

app.delete("/api/target/:id", function(req, res, next){
  let id = req.params.id;

  db.none(`delete from target_quarterly where target_id = $1`, id)
  .then(()=>{
    return db.none(`delete from contact where target_id = $1`, id)
  })
  .then(()=>{
    return db.one(`delete from target where id = $1 returning *`, id)
  })
  .then((target)=>{
    res.json(target)
  })
  .catch(next)
})

app.post("/api/createtarget", function(req, res, next){
  let name = req.body.name;
  let description = req.body.description;
  let last_year_gross_profit = req.body.last_year_gross_profit;
  let last_year_net_sales = req.body.last_year_net_sales;
  let share_volume = req.body.share_volume;
  let last_year_net_income = req.body.last_year_net_income;
  let contacts = req.body.contacts;
  let quarterly = req.body.quarterly;
  let status = "researching";
  let targetid;

  db.one(`insert into target values(default, $1, $2, $3, $4, $5, $6, $7) returning *`, [name, description, last_year_gross_profit, last_year_net_sales, share_volume, last_year_net_income, status])
  .then((data) => {
    targetid = data.id;
    if(contacts){
      let promises = contacts.map((contact)=>{
        db.none(`insert into contact values(default, $1, $2, $3, $4, $5, $6)`,[contact.name, contact.phone, contact.email, contact.title, targetid, contact.is_main])
      })
      return Promise.all(promises)
    }
  })
  .then(()=>{
    if(quarterly){
      let promises = quarterly.map((quarter, idx)=>{
        db.none(`insert into target_quarterly values(default, $1, $2, $3, $4, $5)`,[targetid, quarter.quarter, quarter.net_sales, quarter.gross_profit, quarter.net_income])
      })
      return Promise.all(promises)
    }
  })
  .then(()=>{
    res.json("done inserting")
  })
  .catch(next)
})

app.put("/api/target/:id", function(req, res, next){
  let id = req.params.id;
  let name = req.body.name;
  let description = req.body.description;
  let last_year_gross_profit = req.body.last_year_gross_profit;
  let last_year_net_sales = req.body.last_year_net_sales;
  let share_volume = req.body.share_volume;
  let last_year_net_income = req.body.last_year_net_income;
  let contacts = req.body.contacts;
  let quarterly = req.body.quarterly;

  db.one(`update target set name = $1, description = $2, last_year_gross_profit = $3, last_year_net_sales = $4, share_volume = $5, last_year_net_income = $6 where id = $7 returning *`, [name, description, last_year_gross_profit, last_year_net_sales, share_volume, last_year_net_income, id])
  .then((data) => {
    if(contacts){
      db.none(`delete from contact where target_id = $1`, id)
      .then(()=>{
        let promises = contacts.map((contact)=>{
          db.none(`insert into contact values(default, $1, $2, $3, $4, $5, $6)`,[contact.name, contact.phone, contact.email, contact.title, id, contact.is_main])
        })
        return Promise.all(promises)
      })
    }
  })
  .then(()=>{
    if(quarterly){
      db.none(`delete from target_quarterly where target_id = $1`, id)
      .then(()=>{
        let promises = quarterly.map((quarter, idx)=>{
          db.none(`insert into target_quarterly values(default, $1, $2, $3, $4, $5)`,[id, quarter.quarter, quarter.net_sales, quarter.gross_profit, quarter.net_income])
        })
        return Promise.all(promises)
      })
    }
  })
  .then(()=>{
    res.json("done editing")
  })
  .catch(next)
})

app.listen(3013, ()=>{
  console.log("listening to 3013...")
})
