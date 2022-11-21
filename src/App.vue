
<template>
  <div>
    <h1>This is Frontend to canenct API of Golang</h1>
    <form>
      <h3><label for="movie">Enter Name</label></h3>
      <input type="text" name="movie" id="movie" v-model="inptMovie" />

      <h3>
        <label for="watched">Have you watched it ?</label>
        <chCheckbox v-model="inptWatched" :binary="true" name="watched" id="watched" />
      </h3>
    </form>
    <div>
      <btnButton id="btnmajor" icon="pi pi-check" @click="getData()& $refs.alert
          .showAlert('success', '', 'Your movie list is here !!', '', '',
          )" label="Show Movie List"
        class="p-button-raised p-button-rounded" />
      <btnButton id="btnmajor" icon="pi pi-check" label="Save Movie" class="p-button-raised p-button-rounded"
        @click="addMovie() & $refs.alert
          .showAlert('success', 'Saved !!', 'Your movie is Saved !!', '', '',
          )" />
      <btnButton id="btnmajor" icon="pi pi-trash" label="Delete All Movies" class="p-button-raised p-button-rounded"
        @click="delAllMovies() &$refs.alert
          .showAlert('error', 'Deleted !!', 'You have deleted all movies', '', '',
          )" style="background-color:red" />
    </div>
    <table>
      <tr v-for="(i, idx) in data" :key="idx">
        <td>
          {{ i.movie }}
        </td>
        <td style="padding: 1rem">
          {{ i.watched }}
        </td>
        <td>
          <btnButton id="btnmajor" icon="pi pi-trash" label="Delete" class="p-button-raised p-button-rounded"
            style="background-color:red" :name="'del' + idx"  @click="delMovie(i._id) & $refs.alert
            .showAlert('error', 'Deleted!!', 'Your movie is Deleted!!', '', '',
            )" />

       
        </td>
        <td>
          <btnButton id="btnmajor" icon="pi pi-check" label="Edit" class="p-button-raised p-button-rounded"
          @click="Edit(i.movie, i.watched) & $refs.alert
          .showAlert('info', 'You can now edit your movie name.', 'After editing click on Update!!', '', '',
          )"  />
             <btnButton id="btnmajor" icon="pi pi-check" :name="'update' + idx"  label="Update" class="p-button-raised p-button-rounded"
             @click="updateMovie(i._id) & $refs.alert
          .showAlert('success', 'Updated !!', 'Your movie is Updated !!', '', '',
          )"/>
        </td>
      </tr>
    </table>
    <vue-basic-alert :duration="1000" :closeIn="2000" ref="alert" />
  </div>
</template>

<script>

import axios from "axios";
import VueBasicAlert from 'vue-basic-alert'


export default {
  name: "App",
  el: '#app',
  data() {
    return {
      data: [],

      movie: "",
      watched: "",
      inptMovie: "",
      inptWatched: "",
      del: "",
    };
  },
  components: {
    VueBasicAlert
  },
  //function to call on load event 
  async mounted() {
    await this.getData();
  },
  methods: {
    handelRowClick(row) {
      console.log(row);
    },
    async getData() {
      await axios.get("http://localhost:8082/api/movies").then((response) => {
        this.data = response.data.result;
        console.log(this.data);
      });
    },
    async addMovie() {
      if (this.inptMovie != null) {
        let inputVal = await axios.post("http://localhost:8082/api/movies", {
          movie: this.inptMovie,
          watched: this.inptWatched,
        });
        console.log(inputVal);
        this.getData();
      } else {
        console.error("Dangerrrrr");
      }
    },
    async delMovie(_id) {
      await axios.delete("http://localhost:8082/api/movies/" + _id);
      this.getData();
    },
    async updateMovie(_id) {
      if (this.inptMovie != null) {
        let inputVal = await axios.put(
          "http://localhost:8082/api/movies/" + _id,
          {
            movie: this.inptMovie,
            watched: this.inptWatched,
          }
        );
        console.log(inputVal);
        this.getData();
      } else {
        console.error("Dangerrrrr");
      }
    },
    Edit(upmovie, upwatched) {
      this.inptMovie = upmovie;
      this.inptWatched = upwatched;

    },
    async delAllMovies() {
      await axios.delete("http://localhost:8082/api/deleteallmovie");
      this.getData();
    },
  },
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}

input {
  max-width: 15rem;
  margin: 1rem;
}

tr:nth-child(even) {
  background-color: #d6eeee;
}

th {
  border: 0.1rem;
  border-style: solid;
  padding: 0.2rem;
}

#btnmajor {
  margin: 1rem;
}

#del {
  margin: 0;
  padding: 0;
}

#watched {
  margin-left: 1rem;
}

/* .update{
  display: none;
} */
</style>
