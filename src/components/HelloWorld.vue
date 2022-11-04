<template>
  <!-- eslint-disable -->
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Librairie</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#bookList">Liste des emprunt</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#ajoutEmprunt">Ajout d'un emprunt</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  </header>

  <main>

    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" id="carou1">
          <img src = "../assets/shutterstock_1530516716.jpg" width="100%" height="100%"/>

          <div class="container">
            <div class="carousel-caption text-start">
              <h1>Librairie Web.</h1>
              <p>Ajout d'utilisateur, d'emprunt, et suppression livre </p>
              <p><a class="btn btn-lg btn-primary" href="#ajoutAdherent">Ajouter un adhérent</a></p>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img src = "../assets/shutterstock_1529567276.jpg" width="100%" height="100%"/>

          <div class="container">
            <div class="carousel-caption text-start">
              <h1>Librairie Web.</h1>
              <p>Ajout d'utilisateur, d'emprunt, et suppression livre </p>
              <p><a class="btn btn-lg btn-primary" href="#ajoutReservation">Ajouter une reservation</a></p>
            </div>
          </div>

        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>


    <div class="container marketing" id="bookList">
      <h2 class="featurette-heading">Liste des livres <span class="text-muted">empruntés par des adhérents</span></h2>
      <br>
      <div class="row">
        <div class="col-lg-12">
          <table class="table table-bordered table-sm">
            <thead class="table-dark">
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Livres</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="entry in usersData">
              <td>
                {{entry.nom}}
              </td>

              <td>
                {{entry.prenom}}
              </td>
              <td>
                <table class="table ">

                  <thead>
                  <tr>
                    <th scope="col">Titre</th>
                    <th scope="col">Sous-titre</th>
                    <th scope="col">Nombre de pages</th>
                    <th scope="col">Auteur</th>
                    <th scope="col">A rendre le</th>
                    <th scope="col">Supprimer</th>


                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(value,attribute) in getBooksByUser(entry.id)" :key="attribute">
                    <td>{{value.titre}}</td>
                    <td>{{value.sous_titre}}</td>
                    <td>{{value.pages}}</td>
                    <td>{{value.auteur}}</td>
                    <td>{{value.date_rendu}}</td>
                    <td><button type="button" class="btn btn-danger" v-on:click="deleteBook(entry.id, value.id) ">Retirer</button></td>

                  </tr>
                  </tbody>
                </table>
              </td>

            </tr>
            </tbody>
          </table>
        </div>
      </div>


      <hr class="featurette-divider" id="ajoutEmprunt">
      <div class="d-flex" id="ajoutReservation">
        <button v-on:click="disableBookFormGroup = false" class="btn btn-outline-success" >Enregistrer un emprunt</button>
      </div>

      <div  v-bind:class="{ disableForm: disableBookFormGroup == true } ">
        <div class="row featurette">

          <div class="row justify-content-md-center">
            <div class="col-md-7 col-lg-8">
              <h4 class="mt-3">Réservation d'un livre.</h4>
              <form class="needs-validation" @submit.prevent="addBookLoan">
                <div class="row g-3">
                  <div class="col-sm-6">
                    <label for="title" class="form-label">Titre du livre</label>
                    <input type="text" v-model="title" class="form-control" id="firstName" placeholder=""  required>
                  </div>

                  <div class="col-sm-6">
                    <label for="lastName" class="form-label">Nombre de pages</label>
                    <input type="text" v-model="pages" class="form-control" id="lastName" placeholder=""  required>
                  </div>

                  <div class="col-12">
                    <label for="username" class="form-label">Sous-titre</label>
                    <div class="input-group has-validation">
                      <span class="input-group-text">S</span>
                      <input type="text"  v-model="subtitle" class="form-control" id="username" placeholder="Sous-titre" required>
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="username" class="form-label">Auteur</label>
                    <div class="input-group has-validation">
                      <span class="input-group-text">A</span>
                      <input type="text" v-model="author" class="form-control" id="username" placeholder="Auteur" required>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="country" class="form-label">Emprunteur</label>

                    <select  class="form-select" v-model="selectedUser">
                      <option value="">Choissisez un adhérent</option>
                      <option v-for="user in usersData" :value="user.id">  {{user.prenom}} {{user.nom}}</option>
                    </select>
                    <div class="invalid-feedback">
                      Please select a valid country.
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="date" class="form-label">Choisissez une date de rendu</label>
                    <Datepicker v-model="date_rendu"></Datepicker>

                    <div class="invalid-feedback">
                      Choissisez une date valid
                    </div>
                  </div>

                </div>

                <hr class="my-4">

                <button class="w-100 btn btn-primary btn-lg" href="#" type="submit">Enregistrer cet emprunt</button>
              </form>
            </div>


          </div>

        </div>


      </div>

      <hr class="featurette-divider">



      <hr class="featurette-divider" id="ajoutAdherent">
      <div class="d-flex justify-content-end">
        <button v-on:click="disableUserFormGroup = false" class="btn btn-outline-success" >Enregistrer un adhérent</button>
      </div>
      <div  v-bind:class="{ disableForm: disableUserFormGroup == true } ">
        <div class="row featurette">


          <div class="row justify-content-md-center">
            <div class="col-md-7 col-lg-8">
              <h4 class="mt-3">Ajout d'un adhérent</h4>
              <form class="needs-validation" @submit.prevent="addUserLoan">
                <div class="row g-3">
                  <div class="col-sm-6">
                    <label for="title" class="form-label">Nom</label>
                    <input type="text" v-model="name" class="form-control" id="firstName" placeholder=""  required>
                  </div>

                  <div class="col-sm-6">
                    <label for="lastName" class="form-label">Prénom</label>
                    <input type="text" v-model="firstName" class="form-control" id="lastName" placeholder=""  required>
                  </div>

                  <div class="col-sm-6">
                    <label for="username" class="form-label">Age</label>
                    <div class="input-group has-validation">
                      <span class="input-group-text">&#129313;</span>
                      <input type="text"  v-model="age" class="form-control" id="username"  required>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label for="date" class="form-label">Date d'indscription</label>
                    <Datepicker v-model="dateInscription"></Datepicker>

                    <div class="invalid-feedback">
                      Choissisez une date valid
                    </div>
                  </div>

                </div>

                <hr class="my-4">

                <button class="w-100 btn btn-primary btn-lg" type="submit">Enregistrer cet emprunt</button>
              </form>
            </div>


          </div>

        </div>


      </div>

      <hr class="featurette-divider">

      <!-- /END THE FEATURETTES -->

    </div><!-- /.container -->


    <!-- FOOTER -->
    <footer class="container">
      <p class="float-end"><a href="#">Back to top</a></p>
      <p>&copy; 2017–2021 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
    </footer>
  </main>



</template>


<script>

import * as firestore from "firebase/firestore";
import {db} from "@/firebaseInit";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: { Datepicker },
  data() {
    return {
      title: "",
      pages:null,
      author:'',
      subtitle:"",
      date_rendu:Date,
      usersData: [
      ],
      booksData:[],
      selectedUser:'',
      disableBookFormGroup:true,
      disableUserFormGroup:true,
      name:"",
      firstName:"",
      age:'',
      dateInscription:''
    };
  },
  methods: {
     async readUser() {
       this.usersData = [];
       this.booksData = [];
       const q = firestore.query(firestore.collection(db, "Users"));
      const querySnapshot =  firestore.getDocs(q);
      querySnapshot.then((users)=> users.forEach((userDoc) => {
        this.readBookData(userDoc.id)
        const user = {
          id:userDoc.id,
          nom: userDoc.data().nom,
          prenom: userDoc.data().prenom,
          age: userDoc.data().age,
        }
        this.usersData.push(user);
          }))
    },
     async readBookData(userId) {
      const b = firestore.query(firestore.collection(db, "Users/"+userId+"/Book"))
      const bookQuerySnapshot =  firestore.getDocs(b);

      bookQuerySnapshot.then((books) => books.forEach((bookDoc) => {
        this.booksData.push({
          id:bookDoc.id,
          id_Emprunt:userId,
          titre: bookDoc.data().Titre,
          sous_titre: bookDoc.data().SousTitre,
          auteur:bookDoc.data().Auteur,
          date_rendu:bookDoc.data().Date_Rendu ? bookDoc.data().Date_Rendu.toDate().toLocaleDateString():'',
          pages: bookDoc.data().Pages,

        })
      }))

    },

    getBooksByUser(userId) {
       return this.booksData.filter((book) => book.id_Emprunt === userId)
    },
     addBookLoan(){
      const subColRef = firestore.collection(db, "Users/"+ this.selectedUser+"/Book");
       firestore.addDoc(subColRef,{
        Titre: this.title,
        Pages: this.pages,
        Auteur: this.author,
        SousTitre:this.subtitle,
        Date_Rendu:this.date_rendu
      })
       this.readUser();
        this.disableBookFormGroup = true
    },
    addUserLoan(){
      const subColRef = firestore.collection(db, "Users/");
      firestore.addDoc(subColRef,{
        nom: this.name,
        prenom: this.firstName,
        age: this.age,
        dateInscription:this.dateInscription,
      })
      this.readUser();
      this.disableUserFormGroup = true
    },
    deleteBook(userId,bookId){
      const subColRef = firestore.doc(db, "Users/"+ userId+"/Book/"+ bookId);
      firestore.deleteDoc(subColRef)
      this.readUser();

    },
  },

  mounted() {
    this.readUser();
  },
};
</script>

<style>

/* GLOBAL STYLES
-------------------------------------------------- */
/* Padding below the footer and lighter body text */

body {
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #5a5a5a;
}

.disableForm{
  display: none;
}

/* CUSTOMIZE THE CAROUSEL
-------------------------------------------------- */

/* Carousel base class */
.carousel {
  margin-bottom: 4rem;
}
/* Since positioning the image, we need to help out the caption */
.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

/* Declare heights because of positioning of img element */
.carousel-item {
  height: 32rem;
}
.carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 32rem;
}


/* MARKETING CONTENT
-------------------------------------------------- */

/* Center align the text within the three columns below the carousel */
.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}
.marketing h2 {
  font-weight: 400;
}
/* rtl:begin:ignore */
.marketing .col-lg-4 p {
  margin-right: .75rem;
  margin-left: .75rem;
}
/* rtl:end:ignore */


/* Featurettes
------------------------- */

.featurette-divider {
  margin: 5rem 0; /* Space out the Bootstrap <hr> more */
}

/* Thin out the marketing headings */
.featurette-heading {
  font-weight: 300;
  line-height: 1;
  /* rtl:remove */
  letter-spacing: -.05rem;
}


/* RESPONSIVE CSS
-------------------------------------------------- */

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}

</style>



