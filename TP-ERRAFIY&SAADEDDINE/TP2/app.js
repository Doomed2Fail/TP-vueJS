const app = Vue.createApp({
  data() {
    return {
      filtreNom: '',
      homme: true,
      femme: true,
      tel: true,
      mef: false,
      taille: 2,
      contactsVisibles: {},
      personnes: [
        {
                "id": "50777e60-394d-4951-b933-a2f78599065d",
                "gender": "female",
                "name": {
                        "title": "Mrs",
                        "first": "Elizabeth",
                        "last": "Ambrose"
                },
                "location": {
                        "country": "Canada"
                },
                "phone": "366-033-8063",
                "email": "elizabeth.ambrose@example.com",
                "picture": {
                        "large": "https://randomuser.me/api/portraits/women/49.jpg",
                        "medium": "https://randomuser.me/api/portraits/med/women/49.jpg",
                        "thumbnail": "https://randomuser.me/api/portraits/thumb/women/49.jpg"
                }
        },
        {
                "id": "5308f02b-7838-4b48-8114-2fe1349c0819",
                "gender": "male",
                "name": {
                        "title": "Mr",
                        "first": "Batista",
                        "last": "Silveira"
                },
                "location": {
                        "country": "Brazil"
                },
                "phone": "(53) 5553-2892",
                "email": "batista.silveira@example.com",
                "picture": {
                        "large": "https://randomuser.me/api/portraits/men/50.jpg",
                        "medium": "https://randomuser.me/api/portraits/med/men/50.jpg",
                        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/50.jpg"
                }
        },
        {
                "id": "3f7d9b90-8858-4986-bdf3-075df560ce31",
                "gender": "male",
                "name": {
                        "title": "Mr",
                        "first": "Blaise",
                        "last": "Adam"
                },
                "location": {
                        "country": "Switzerland"
                },
                "phone": "079 493 00 77",
                "email": "blaise.adam@example.com",
                "picture": {
                        "large": "https://randomuser.me/api/portraits/men/29.jpg",
                        "medium": "https://randomuser.me/api/portraits/med/men/29.jpg",
                        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/29.jpg"
                }
        }
]
    };
  },
  computed: {
    personnesFiltrees() {
      const recherche = this.filtreNom.trim().toLowerCase();
      return this.personnes.filter(p => {
        const Genre = (this.homme && p.gender === 'male') || (this.femme && p.gender === 'female');
        const Nom = (p.name.first + ' ' + p.name.last).toLowerCase().includes(recherche);
        return Genre && Nom;
      });
    }
  },
  methods: {
    toggleContacts(personne) {
      this.contactsVisibles[personne.id] = !this.contactsVisibles[personne.id];
    },
    photo(personne) {
      if (this.taille === 1) {
        return personne.picture.thumbnail;
      }
      if (this.taille === 2) {
        return personne.picture.medium;
      }
      return personne.picture.large;
    }
  }
});

app.mount('#app');
