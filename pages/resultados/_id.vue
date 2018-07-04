<template>
    <div>
        <toolbar>
        </toolbar>
        <h1> Resultados de {{$route.params.id}} </h1>
        <v-container >
            <div v-if="albumExists">
                <div v-for="(album, index) in albumData" :key="`ab${index}`" >
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
                        <!-- {{albumData}} -->
                </div>
            </div>
            <div v-else>
                <h1>No Hay Resultados Disponibles</h1>
            </div>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
import Card from '~/components/Card.vue';
import toolbar from "~/components/Toolbar.vue";

export default {
    asyncData({params}){
        return axios.get(`https://itunes.apple.com/search?term=${params.id}&entity=album`)
        .then((response) => {
            return {albumData: response.data.results}
        });
    },
    
    components: {
        Card,
        toolbar
    },
    middleware:  'buscar',
    methods: {
        picker(index) {
            return index % 2 == 0 ? 'red' : 'blue';
        }
    },
    computed: {
        albumExists() {
            return this.albumData.length > 0;
        }
    }
}
</script>
