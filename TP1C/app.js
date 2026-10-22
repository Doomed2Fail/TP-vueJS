const app = Vue.createApp({
  data() {
    return {
      recherche: '',
      detailOuvert: null,
      prochainId: 5,
      erreur: '',

      modules: [
        {
          id: 1,
          nom: 'Développement web',
          note: 16,
          coefficient: 3
        },
        {
          id: 2,
          nom: 'Algorithmique',
          note: 14,
          coefficient: 4
        },
        {
          id: 3,
          nom: 'Réseaux',
          note: 8,
          coefficient: 2
        },
        {
          id: 4,
          nom: 'Anglais',
          note: 12,
          coefficient: 1
        }
      ],

      nouveauModule: {
        nom: '',
        note: '',
        coefficient: 1
      }
    };
  },

  computed: {
    moyenneGenerale() {
      const sommeNotes = this.modules.reduce(function(total, module) {
        return total + module.note * module.coefficient;
      }, 0);

      const sommeCoefficients = this.modules.reduce(function(total, module) {
        return total + module.coefficient;
      }, 0);

      if (sommeCoefficients === 0) {
        return 0;
      }

      const moyenne = sommeNotes / sommeCoefficients;

      return Number(moyenne.toFixed(2));
    },

    modulesARattraper() {
      return this.modules.filter(function(module) {
        return module.note < 10;
      });
    },

    modulesTries() {
      // slice() crée une copie pour conserver l'ordre du tableau original.
      const copie = this.modules.slice();

      copie.sort(function(a, b) {
        return b.note - a.note;
      });

      return copie;
    },

    modulesAffiches() {
      const texte = this.recherche.trim().toLowerCase();

      return this.modulesTries.filter(function(module) {
        return module.nom.toLowerCase().includes(texte);
      });
    },

    moduleMax() {
      if (this.modulesTries.length === 0) {
        return null;
      }

      return this.modulesTries[0];
    },

    moduleMin() {
      if (this.modulesTries.length === 0) {
        return null;
      }

      const dernierePosition = this.modulesTries.length - 1;

      return this.modulesTries[dernierePosition];
    }
  },

  methods: {
    toggleDetail(module) {
      if (this.detailOuvert === module.id) {
        this.detailOuvert = null;
      } else {
        this.detailOuvert = module.id;
      }
    },

    ajouterModule() {
      if (this.nouveauModule.nom.trim() === '') {
        this.erreur = 'Écris le nom du module.';
        return;
      }

      if (
        !Number.isFinite(this.nouveauModule.note) ||
        this.nouveauModule.note < 0 ||
        this.nouveauModule.note > 20
      ) {
        this.erreur = 'La note doit être comprise entre 0 et 20.';
        return;
      }

      if (
        !Number.isFinite(this.nouveauModule.coefficient) ||
        this.nouveauModule.coefficient <= 0
      ) {
        this.erreur = 'Le coefficient doit être supérieur à zéro.';
        return;
      }

      const module = {
        id: this.prochainId,
        nom: this.nouveauModule.nom.trim(),
        note: this.nouveauModule.note,
        coefficient: this.nouveauModule.coefficient
      };

      this.modules.push(module);
      this.prochainId = this.prochainId + 1;

      this.nouveauModule.nom = '';
      this.nouveauModule.note = '';
      this.nouveauModule.coefficient = 1;

      this.erreur = '';
    },

    supprimerModule(module) {
      for (let i = 0; i < this.modules.length; i++) {
        if (this.modules[i].id === module.id) {
          this.modules.splice(i, 1);
          break;
        }
      }

      if (this.detailOuvert === module.id) {
        this.detailOuvert = null;
      }
    },

    tousValides() {
      return this.modules.every(function(module) {
        return module.note >= 10;
      });
    }
  }
});

app.mount('#app');