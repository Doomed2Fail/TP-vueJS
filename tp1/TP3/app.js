const app = Vue.createApp({
  data() {
    return {
      filtre: 'toutes',

      taches: [
        {
          id: 1,
          title: 'Faire les courses',
          description: 'Acheter des légumes et du lait.',
          completed: false
        },
        {
          id: 2,
          title: 'Faire du sport',
          description: 'Courir pendant 30 minutes.',
          completed: true
        },
        {
          id: 3,
          title: "Réviser pour l'examen",
          description: 'Relire le chapitre 5.',
          completed: false
        }
      ]
    };
  },

  computed: {
    nombreTotal() {
      return this.taches.length;
    },

    tachesFiltrees() {
      const resultat = [];

      for (const tache of this.taches) {
        if (this.filtre === 'toutes') {
          resultat.push(tache);
        } else if (this.filtre === 'aFaire' && tache.completed === false) {
          resultat.push(tache);
        } else if (this.filtre === 'terminees' && tache.completed === true) {
          resultat.push(tache);
        }
      }

      return resultat;
    }
  },

  methods: {
    terminer(tache) {
      tache.completed = true;
    }
  }
});

app.mount('#app');