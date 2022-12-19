const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testing'
});

app.use(express.json())

app.get('/show', (req, res) => {
    connection.query('SELECT NamaSepedaMotor, Jenis, Harga, Keterangan FROM motorcycle', function (error, results, fields) {
        try {
            if (error) throw error;
            res.send({ status: 'true', data: results })
        } catch (error) {
            console.log(error)
            res.send({ status: 'false', message: 'Terjadi kesalahan !. Silahkan coba lagi' })
        }
    });
})

app.post('/insert', (req, res) => {
    let namasepedamotor = req.body.namasepedamotor
    let jenis = req.body.jenis
    let harga = req.body.harga
    let keterangan = req.body.keterangan

    connection.query('INSERT INTO motorcycle (NamaSepedaMotor,Jenis,Harga,Keterangan) VALUES ("' + namasepedamotor + '","' + jenis + '","' + harga + '","' + keterangan + ' ")', function (error, results, fields) {
        try {
            if (error) throw error;
            res.send({ status: 'true', message: 'Selamat data berhasil ditambahkan' })
        } catch (error) {
            console.log(error)
            res.send({ status: 'falese', message: 'Terjadi kesalahan !. Silahkan coba lagi' })
        }
    });
})

app.post('/update', (req, res) => {
    let iddata = req.body.iddata
    let namasepedamotor = req.body.namasepedamotor
    let jenis = req.body.jenis
    let harga = req.body.harga
    let keterangan = req.body.keterangan

    connection.query('UPDATE motorcycle SET NamaSepedaMotor="'+namasepedamotor+'", Jenis="'+jenis+'", Harga="'+harga+'", Keterangan="'+keterangan+'" WHERE ID="'+iddata+'";', function (error, results, fields) {
        try {
            if (error) throw error;
            res.send({ status: 'true', message: 'Selamat data berhasil diubah' })
        } catch (error) {
            console.log(error)
            res.send({ status: 'falese', message: 'Terjadi kesalahan !. Silahkan coba lagi' })
        }
    });
})

app.post('/delete', (req, res) => {
    let iddata = req.body.iddata

    connection.query('DELETE FROM motorcycle WHERE ID="'+iddata+'";', function (error, results, fields) {
        try {
            if (error) throw error;
            res.send({ status: 'true', message: 'Selamat data berhasil dihapus' })
        } catch (error) {
            console.log(error)
            res.send({ status: 'false', message: 'Terjadi kesalahan !. Silahkan coba lagi' })
        }
    });
})

app.listen(port, () => {
    console.log(`Selamat Anda Berhasil Menjalankan Port ${port}`)
})