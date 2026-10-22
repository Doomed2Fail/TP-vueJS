const app = Vue.createApp({
  data() {
    return {
      rechercheTexte: '',
      filtreCategorie: 'toutes',

      categories: ['Boissons', 'Snacks', 'Fournitures'],

      detailOuvert: null,
      articleReappro: null,
      quantiteReappro: 1,
      prochainId: 4,
      erreur: '',

      articles: [
        {
          id: 1,
          nom: 'Eau',
          categorie: 'Boissons',
          quantite: 12,
          prixUnitaire: 5,
          seuilAlerte: 3
        },
        {
          id: 2,
          nom: 'Biscuits',
          categorie: 'Snacks',
          quantite: 2,
          prixUnitaire: 4,
          seuilAlerte: 3
        },
        {
          id: 3,
          nom: 'Stylo',
          categorie: 'Fournitures',
          quantite: 0,
          prixUnitaire: 3,
          seuilAlerte: 2
        }
      ],

      nouvelArticle: {
        nom: '',
        categorie: 'Boissons',
        quantite: 0,
        prixUnitaire: 0,
        seuilAlerte: 2
      }
    };
  },

  computed: {
    articlesFiltres() {
      const resultat = [];
      const recherche = this.rechercheTexte.trim().toLowerCase();

      for (const article of this.articles) {
        const bonNom = article.nom.toLowerCase().includes(recherche);

        let bonneCategorie = false;

        if (this.filtreCategorie === 'toutes') {
          bonneCategorie = true;
        } else if (article.categorie === this.filtreCategorie) {
          bonneCategorie = true;
        }

        if (bonNom && bonneCategorie) {
          resultat.push(article);
        }
      }

      return resultat;
    },

    valeurTotaleStock() {
      let total = 0;

      for (const article of this.articles) {
        total = total + article.quantite * article.prixUnitaire;
      }

      return total;
    },

    nombreRupture() {
      let nombre = 0;

      for (const article of this.articles) {
        if (article.quantite === 0) {
          nombre = nombre + 1;
        }
      }

      return nombre;
    }
  },

  methods: {
    incrementer(article) {
      article.quantite = article.quantite + 1;
    },

    decrementer(article) {
      if (article.quantite > 0) {
        article.quantite = article.quantite - 1;
      }
    },

    toggleDetail(article) {
      if (this.detailOuvert === article.id) {
        this.detailOuvert = null;
      } else {
        this.detailOuvert = article.id;
      }
    },

    supprimerArticle(article) {
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === article.id) {
          this.articles.splice(i, 1);
          break;
        }
      }

      if (this.detailOuvert === article.id) {
        this.detailOuvert = null;
      }

      if (this.articleReappro === article.id) {
        this.articleReappro = null;
      }
    },

    ajouterArticle() {
      if (this.nouvelArticle.nom.trim() === '') {
        this.erreur = 'Écris le nom de l’article.';
        return;
      }

      if (
        !Number.isInteger(this.nouvelArticle.quantite) ||
        this.nouvelArticle.quantite < 0
      ) {
        this.erreur = 'La quantité doit être un entier positif ou nul.';
        return;
      }

      if (
        !Number.isFinite(this.nouvelArticle.prixUnitaire) ||
        this.nouvelArticle.prixUnitaire < 0
      ) {
        this.erreur = 'Le prix doit être un nombre positif ou nul.';
        return;
      }

      if (
        !Number.isInteger(this.nouvelArticle.seuilAlerte) ||
        this.nouvelArticle.seuilAlerte < 0
      ) {
        this.erreur = 'Le seuil doit être un entier positif ou nul.';
        return;
      }

      const article = {
        id: this.prochainId,
        nom: this.nouvelArticle.nom.trim(),
        categorie: this.nouvelArticle.categorie,
        quantite: this.nouvelArticle.quantite,
        prixUnitaire: this.nouvelArticle.prixUnitaire,
        seuilAlerte: this.nouvelArticle.seuilAlerte
      };

      this.articles.push(article);
      this.prochainId = this.prochainId + 1;

      this.nouvelArticle.nom = '';
      this.nouvelArticle.categorie = 'Boissons';
      this.nouvelArticle.quantite = 0;
      this.nouvelArticle.prixUnitaire = 0;
      this.nouvelArticle.seuilAlerte = 2;

      this.erreur = '';
    },

    ouvrirReappro(article) {
      if (this.articleReappro === article.id) {
        this.articleReappro = null;
      } else {
        this.articleReappro = article.id;
      }

      this.quantiteReappro = 1;
    },

    reapprovisionner(article) {
      if (!Number.isInteger(this.quantiteReappro)) {
        return;
      }

      if (this.quantiteReappro <= 0) {
        return;
      }

      article.quantite = article.quantite + this.quantiteReappro;
      this.articleReappro = null;
    }
  }
});

app.mount('#app');