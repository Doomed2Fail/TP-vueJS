const app = Vue.createApp({
  data() {
    return {
      books: [
        {
          id: 1,
          title: "Clean Code",
          author: "Robert C. Martin",
          year: 2008,
          genre: "Génie logiciel",
          isFav: true,
          keywords: ["Clean Code", "Qualité"]
        },
        {
          id: 2,
          title: "Introduction to Algorithms",
          author: "Cormen, Leiserson, Rivest, Stein",
          year: 2009,
          genre: "Algorithmique",
          isFav: false,
          keywords: ["Algorithmes", "Structures de données"]
        },
        {
          id: 3,
          title: "Design Patterns",
          author: "Gamma, Helm, Johnson, Vlissides",
          year: 1994,
          genre: "Génie logiciel",
          isFav: true,
          keywords: ["Design Patterns", "Architecture"]
        },
        {
          id: 4,
          title: "Le Petit Prince",
          author: "Antoine de Saint-Exupéry",
          year: 1943,
          genre: "Littérature",
          isFav: false,
          keywords: ["Classique", "Conte"]
        },
        {
          id: 5,
          title: "Computer Networks",
          author: "Andrew S. Tanenbaum",
          year: 2010,
          genre: "Réseaux",
          isFav: false,
          keywords: ["Réseaux", "Système"]
        },
        {
          id: 6,
          title: "You Don't Know JS",
          author: "Kyle Simpson",
          year: 2015,
          genre: "Développement web",
          isFav: true,
          keywords: ["JavaScript", "Web"]
        }
      ],
      newBook: {
        title: "",
        author: "",
        year: 2024,
        genre: "",
        isFav: false,
        keywords: []
      },
      nouveauMotCle: "",
      showDetails: {},
      afficherFavoris: false
    };
  },
  computed: {
    nombreFavoris() {
      return this.books.filter(b => b.isFav).length;
    },
    livresFiltres() {
      if (this.afficherFavoris) {
        return this.books.filter(b => b.isFav);
      }
      return this.books;
    },
    formulaireValide() {
      return Boolean(this.newBook.title.trim() && this.newBook.author.trim());
    }
  },
  methods: {
    toggleDetails(book) {
      this.showDetails[book.id] = !this.showDetails[book.id];
    },
    toggleFavori(book) {
      book.isFav = !book.isFav;
    },
    supprimerLivre(book) {
      this.books = this.books.filter(b => b.id !== book.id);
    },
    ajouterLivre() {
      if (!this.formulaireValide) return;

      this.books.push({
        ...this.newBook,
        id: Date.now(),
        keywords: [...this.newBook.keywords]
      });

      this.newBook = {
        title: "",
        author: "",
        year: 2024,
        genre: "",
        isFav: false,
        keywords: []
      };
    },
    ajouterMotCle() {
      const mot = this.nouveauMotCle.trim();
      if (mot && !this.newBook.keywords.includes(mot)) {
        this.newBook.keywords.push(mot);
      }
      this.nouveauMotCle = "";
    },
    retirerMotCle(index) {
      this.newBook.keywords.splice(index, 1);
    }
  }
});

app.mount('#app');
