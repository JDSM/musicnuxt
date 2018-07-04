<template>
  <div>
  <toolbar>
  </toolbar>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-select
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          v-model="select"
          label="Artitas"
          autocomplete
          cache-items
          chips
          required
          item-text="artistName"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
    <h1>Bucar en iTunes</h1>
    <br/>
    <v-container style="height: 80%;">
      <div v-if="albumExists" style="display: flex; flex-wrap: wrap; box-sizing: inherit;">
        <div v-for="(album, index) in items" :key="index">
          <Card 
            :title="album.collectionCensoredName"
            :image="album.artworkUrl100"
            :artistName="album.artistName"
            :url="album.artistViewUrl"
            :color="picker(index)"
            :collectionName="album.collectionName"
            :primaryGenreName="album.primaryGenreName"     
            :releaseDate="album.releaseDate"
          />
        </div>
      </div>
      <div v-else>
        <h1>No Hay Resultados Disponibles</h1>   
      </div>
    </v-container>
    <!--<form @submit.prevent="submit">
      <input placeholder="Ingresa El Nombre Del Artista"
      v-model="buscar" autofocus />

    </form>-->
    
  </div>
</template>

<script>
import axios from 'axios';
import Card from '~/components/Card.vue';
import toolbar from "~/components/Toolbar.vue";
export default {
  components: {
    Card,
    toolbar
  },
  methods: {
    picker(index) {
            return index % 2 == 0 ? 'red' : 'blue';
    },
    querySelections (v) {
        this.loading = true
        // Simulated ajax query
        axios.get(`https://itunes.apple.com/search?term=${v}&entity=album`)
        .then((response) => {
          this.loading = false
            this.items = response.data.results
        });
      }
  },
  computed: {
        albumExists() {
            return this.items.length > 0;
        }
  },
  data () {
      return {
        buscar: '',
        loading: false,
        items: [],
        search: null,
        select: [],
        albumData: []
      }
    },
    watch: {
      search (val) {
        val && this.querySelections(val)
      }
    },
}
</script>

<style>
* {
  text-align: center;
}

h1 {
  padding: 20px;
}
</style>
