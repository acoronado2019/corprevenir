const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
const multer = require('multer');
const fs = require("fs");
const fastcsv = require("fast-csv");
// const JWT = require('jsonwebtoken')
// const secretWord = 'Samus#Aran'

const storage = multer.diskStorage({
	destination: 'uploads/',
	filename: function(req, file, cb){
		cb("", "cargue.csv");
	}
})
const upload = multer({
	storage: storage
})

const credentials = {
	host: 'localhost',
	user: 'conexion',
	password: 'Janda2022',
	database: 'dbpuntosdorados'
}

app.get('/', (req, res) => {
	res.send('hola desde tu primera ruta de la Api')
})


app.post('/api/cargue', upload.single('file') , (req, res) => {
let stream = fs.createReadStream("uploads/cargue.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
	  console.log(csvData);
    // remove the first line: header
    csvData.shift();
    // connect to the MySQL database
	var connection = mysql.createConnection(credentials)
    connection.connect(error => {
		if (error) {
		  console.error(error);
		} else {
		  let query =
		  "INSERT INTO dbpuntosdorados.resultado (cedula, nombre, cargo, empresa, email, perfil, item, anno, trimestre, fecha_cargue, puntos ) VALUES ? ";
		  connection.query(query, [csvData], (error, response) => {
			console.log(error || response);
		  });
		}
	  });
  });
stream.pipe(csvStream);
connection.end()
})

app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const values = [username, password]
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM user WHERE name = ? AND password = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"user": result[0].user,
					"username": result[0].username
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})

app.get('/api/resultado', (req, res) => {
	//let cedula = req.headers.cedula;

	let cedula = "123456";
	const values = [cedula]
	
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT cedula, anno, cargo, email FROM dbpuntosdorados.resultado WHERE cedula = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"cedula": result[0].cedula,
					"anno": result[0].anno,
					"cargo": result[0].cargo,
					"email": result[0].email,
					"fecha_cargue": result[0].fecha_cargue
				})
			} else {
				res.status(400).send('Usuario no tiene evaluaacion')
			}
		}
	})
	connection.end()
})

app.listen(4000, () => console.log('Servidor Arriba'))