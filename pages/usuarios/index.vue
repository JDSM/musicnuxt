<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12>
                <v-btn fab dark small @click="dialog.mode='Nuevo '; dialog.show=true">
                    <v-icon>
                         +perm_identity
                    </v-icon>
                </v-btn>
            </v-flex>
            <v-flex xs12>
                <template>
                    <v-data-table
                        :headers="headers"
                        :items="listUsers"
                        hide-actions
                        class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                        
                        <td class="text-xs-center">{{ props.index }}</td>
                        <td class="text-xs-center">{{ props.item.name }}</td>
                        <td class="text-xs-center">{{ props.item.lastName }}</td>
                        <td class="text-xs-center">
                            <v-btn small flat round color="dark"  @click="dialog.mode='Editar '; dialog.show=true; dialog.userId= props.item._id" >
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn small flat round color="dark" v-on:click="deleteUser(props.item._id)">
                                <v-icon>highlight_off</v-icon>
                            </v-btn>
                        </td>
                        
                        </template>
                    </v-data-table>
                </template>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <dialoguser :fetch="fetchUser"  :userId="dialog.userId" :mode="dialog.mode" :show.sync="dialog.show" @closeDialog="onClose" >

            </dialoguser>
        </v-layout>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import dialoguser from "./addOrEdit";
import { Store } from 'vuex';
import axios from 'axios';
export default {
    components:{
        dialoguser
    },
    
    computed: {
        
    },
    watch: {
    
    },
    data () {
        return {
            dialog: {
				show:false,
                mode:'',
                userId: ''
              
            },
            User:[],
            headers: [
                {
                    text: 'No.',
                    align: 'center'
                },
                {
                    text: 'Nombre',
                    align: 'center'
                },
                {
                    text: 'Apellido',
                    align: 'center'
                },
                {
                    text: 'Operaciones',
                    align: 'center'
                }
            ], 
            listUsers:[]
        }
    },
    created (){
        this.fetchUser();
    },
    mounted () {
        //this.$toasted.error('Ffsfsfsfs')
    },
    methods: {
        onClose(param) {
            this.dialog.show= param
        },
        fetchUser(){
            axios.get('http://localhost:3030/user')
            .then(res => {
                this.listUsers=res.data;
            })
            .catch(err => console.log(err));
        },
        deleteUser(id){
            const response = confirm("Seguro que quieres eliminar al usuario?")
            if (response){
                axios.delete('http://localhost:3030/user/' + id)
                .then(res => {
                    this.$toasted.info('Usuario Eliminado')
                    this.fetchUser();
                })
                .catch(err => console.log(err));
            }
            return;
            
        }
    }
}

</script>
 