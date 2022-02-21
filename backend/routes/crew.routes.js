const connection = require("../db-config");
const router = require("express").Router();

router.get('/', (req, res) => {
    connection.query('SELECT * FROM crew', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving members from database');
      } else {
        res.json(result);
      }
    });
  });


router.post('/', (req, res) => {
  const { name, characteristics } = req.body;
  connection.query(
    'INSERT INTO crew (name, characteristics) VALUES (?, ?)',
    [name, characteristics],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving the member ');
      } else {
        const id = result.insertId;
        const createdMember = { id, name, characteristics };
        res.status(201).json(createdMember);
      }
    }
  );
});

router.put('/:id', (req, res) => {
  const memberId = req.params.id;
  const db = connection.promise();
  let existingUser = null;
  db.query('SELECT * FROM crew WHERE id = ?', [memberId])
    .then(([results]) => {
      existingUser = results[0];
      if (!existingUser) return Promise.reject('RECORD_NOT_FOUND');
      return db.query('UPDATE members SET ? WHERE id = ?', [req.body, memberId]);
    })
    .then(() => {
      res.status(200).json({ ...existingUser, ...req.body });
    })
    .catch((err) => {
      console.error(err);
      if (err === 'RECORD_NOT_FOUND')
        res.status(404).send(`member with id ${memberId} not found.`);
      else res.status(500).send('Error updating a member');
    });
});

router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM crew WHERE id = ?',
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error deleting an member');
      } else {
        if (result.affectedRows) res.status(200).send('Member deleted!');
        else res.status(404).send('Member not found.');
      }
    }
  );
});