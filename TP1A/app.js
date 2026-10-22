const app = Vue.createApp({
  data() {
    return {
      budgetMensuel: 1000,
      filtreCategorie: 'toutes',
      afficherStats: false,
      prochainId: 4,

      categories: ['Alimentation', 'Transport', 'Loisirs'],

      nouvelleDepense: {
        titre: '',
        montant: 0,
        categorie: 'Alimentation'
      },

      depenses: [
        {
          id: 1,
          titre: 'Courses',
          montant: 200,
          categorie: 'Alimentation'
        },
        {
          id: 2,
          titre: 'GRAND TAXI',
          montant: 50,
          categorie: 'Transport'
        },
        {
          id: 3,
          titre: 'GYM',
          montant: 60,
          categorie: 'Loisirs'
        }
      ]
    };
  },

  computed: {
    depensesFiltrees() {
      if (this.filtreCategorie === 'toutes') {
        return this.depenses;
      }

      const resultat = [];

      for (const depense of this.depenses) {
        if (depense.categorie === this.filtreCategorie) {
          resultat.push(depense);
        }
      }

      return resultat;
    },

    totalGeneral() {
      let total = 0;

      for (const depense of this.depenses) {
        total = total + depense.montant;
      }

      return total;
    },

    totalFiltre() {
      let total = 0;

      for (const depense of this.depensesFiltrees) {
        total = total + depense.montant;
      }

      return total;
    },

    moyenneDepense() {
      if (this.depensesFiltrees.length === 0) {
        return 0;
      }

      return this.totalFiltre / this.depensesFiltrees.length;
    }
  },

  methods: {
    selectionnerCategorie(cat) {
      this.filtreCategorie = cat;
    },

    ajouterDepense() {
      if (
        this.nouvelleDepense.titre === '' ||
        this.nouvelleDepense.montant <= 0
      ) {
        return;
      }

      const depense = {
        id: this.prochainId,
        titre: this.nouvelleDepense.titre,
        montant: this.nouvelleDepense.montant,
        categorie: this.nouvelleDepense.categorie
      };

      this.depenses.push(depense);
      this.prochainId = this.prochainId + 1;

      this.nouvelleDepense.titre = '';
      this.nouvelleDepense.montant = 0;
    },

    supprimerDepense(depense) {
      for (let i = 0; i < this.depenses.length; i++) {
        if (this.depenses[i].id === depense.id) {
          this.depenses.splice(i, 1);
          return;
        }
      }
    },

    totalCategorie(cat) {
      let total = 0;

      for (const depense of this.depenses) {
        if (depense.categorie === cat) {
          total = total + depense.montant;
        }
      }

      return total;
    }
  }
});

app.mount('#app');