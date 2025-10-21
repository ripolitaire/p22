const express = require('express');
const router = express.Router();
const Etudiant = require('../models/Etudiant');

// Page pour ajouter un étudiant
router.get('/ajouter', (req, res) => {
    res.render('etudiants/ajouter');
});

// Enregistrer l'étudiant depuis le formulaire
router.post('/ajouter', async (req, res) => {
    const etudiant = new Etudiant({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        age: req.body.age
    });

    try {
        await etudiant.save();
        res.redirect('/etudiants/liste');
    } catch (err) {
        res.status(400).send('Erreur : ' + err.message);
    }
});

// Page liste des étudiants
router.get('/liste', async (req, res) => {
    try {
        const etudiants = await Etudiant.find();
        res.render('etudiants/liste', { etudiants });
    } catch (err) {
        res.status(500).send('Erreur : ' + err.message);
    }
});

// Page pour modifier un étudiant
router.get('/modifier/:id', async (req, res) => {
    try {
        const etudiant = await Etudiant.findById(req.params.id);
        if (!etudiant) return res.status(404).send('Étudiant non trouvé');
        res.render('etudiants/modifier', { etudiant });
    } catch (err) {
        res.status(500).send('Erreur : ' + err.message);
    }
});

// Mettre à jour l'étudiant
router.post('/modifier/:id', async (req, res) => {
    try {
        await Etudiant.findByIdAndUpdate(req.params.id, {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            age: req.body.age
        });
        res.redirect('/etudiants/liste');
    } catch (err) {
        res.status(400).send('Erreur : ' + err.message);
    }
});

// Supprimer un étudiant
router.post('/supprimer/:id', async (req, res) => {
    try {
        await Etudiant.findByIdAndDelete(req.params.id);
        res.redirect('/etudiants/liste');
    } catch (err) {
        res.status(500).send('Erreur : ' + err.message);
    }
});

module.exports = router;
