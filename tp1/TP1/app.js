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
          isFav: true
        },
        {
          id: 2,
          title: "Introduction to Algorithms",
          author: "Cormen, Leiserson, Rivest, Stein",
          year: 2009,
          genre: "Algorithmique",
          isFav: false
        },
        {
          id: 3,
          title: "Design Patterns",
          author: "Gamma, Helm, Johnson, Vlissides",
          year: 1994,
          genre: "Génie logiciel",
          isFav: true
        },
        {
          id: 4,
          title: "Le Petit Prince",
          author: "Antoine de Saint-Exupéry",
          year: 1943,
          genre: "Littérature",
          isFav: false
        },
        {
          id: 5,
          title: "Computer Networks",
          author: "Andrew S. Tanenbaum",
          year: 2010,
          genre: "Réseaux",
          isFav: false
        },
        {
          id: 6,
          title: "You Don't Know JS",
          author: "Kyle Simpson",
          year: 2015,
          genre: "Développement web",
          isFav: true
        }
      ],
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
    booksTriesParAnnee() {
      return [...this.books].sort((a, b) => b.year - a.year);
    }
  },
  methods: {
    toggleDetails(book) {
      this.showDetails[book.id] = !this.showDetails[book.id];
    }
  }
});

app.mount('#app');