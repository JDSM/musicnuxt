<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card :color="color" style="padding: 10px; margin: 10px; width: 250px; background-color: #dee4e2 !important;" >
                <div style="width:240px">
                <img :src="image" alt="" height="125px" style="border: 2px solid grey;
    border-radius: 25px;">
                </div>
                <v-card-title primary-title >
                    <div>
                        <div class="headline" >{{artistName}}</div>
                        <span class="grey--text">{{title}}</span>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat @click="dialog.mode='Nuevo '; dialog.show=true ; dialog.dato=[artistName,title,image]">Votar</v-btn>
                    <v-btn flat color="purple" :href="url" target="_blank" >Comprar</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn icon @click.native="show = !show">
                        <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-slide-y-transition>
                    <v-card-text v-show="show">
                        Album: {{collectionName}}, Genero: {{primaryGenreName}}, Año: {{releaseDate}}
                    </v-card-text>
                </v-slide-y-transition>
            </v-card>
        </v-flex>
        <v-layout row justify-center>
            <dialogmusic :dato="dialog.dato" :mode="dialog.mode" :show.sync="dialog.show" @closeDialog="onClose" >

            </dialogmusic>
        </v-layout>
    </v-layout>
</template>
<script>
import dialogmusic from "~/pages/TopMusic/addVote";
export default {
    
    props: ['title', 'image', 'artistName', 'url', 'color', 'collectionName', 'primaryGenreName', 'releaseDate'],
    components:{
        dialogmusic
    },
    data: () => ({
        dialog: {
	        show:false,
            mode:'',
            dato:[],

        },
        show: false
    }),
    methods: {
        onClose(param) {
            this.dialog.show= param
        },
    }
    
}

</script>