const express = require('express');
const router = express.Router();
const Prof = require('../models/Prof');

// Page pour ajouter un prof
router.get('/ajouter', (req, res) => {
    res.render('profs/ajouter');
});

// Enregistrer le prof depuis le formulaire
router.post('/ajouter', async (req, res) => {
    const prof = new Prof({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        age: req.body.age
    });

    try {
        await prof.save();
        res.redirect('/profs/liste');
    } catch (err) {
        res.status(400).send('Erreur : ' + err.message);
    }
});

// Page liste des profs
router.get('/liste', async (req, res) => {
    try {
        const profs = await Prof.find();
        res.render('profs/liste', { profs });
    } catch (err) {
        res.status(500).send('Erreur : ' + err.message);
    }
});

// Page pour modifier un prof
router.get('/modifier/:id', async (req, res) => {
    try {
        const prof = await Prof.findById(req.params.id);
        if (!prof) return res.status(404).send('Prof non trouvé');
        res.render('profs/modifier', { prof });
    } catch (err) {
        res.status(500).send('Erreur : ' + err.message);
    }
});

// Mettre à jour le prof
router.post('/modifier/:id', async (req, res) => {
    try {
        await Prof.findByIdAndUpdate(req.params.id, {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            age: req.body.age
        });
        res.redirect('/profs/liste');
    } catch (err) {
        res.status(400).send('Erreur : ' + err.message);
    }
});

// Supprimer un prof
router.post('/supprimer/:id', async (req, res) => {
    try {
        await Prof.findByIdAndDelete(req.params.id);
        res.redirect('/profs/liste');
    } catch (err) {
        res.status(500).send('Erreur : ' + err.message);
    }
});

module.exports = router;