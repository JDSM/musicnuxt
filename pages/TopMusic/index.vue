<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar  light>
          <v-toolbar-title>Top List Album</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list two-line subheader>
          <v-subheader inset>Artista</v-subheader>
          <v-list-tile v-for="(item, index) in items" :key="index" avatar>
            <v-list-tile-avatar size="55px">
              <img :class="[item.iconClass]" :src="item.img">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.musicName }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.artistName }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action class="text-xs-center">
              <v-btn color="warning" fab small dark >{{ item.promedio }}</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
  export default {
    data () {
      return {
        items: []
      }
    },
    created (){
      this.fetchUser();
    },
    methods: {
      onClose(param) {
          this.dialog.show= param
      },
      fetchUser(){
        axios.get('http://localhost:3030/TopMusic')
        .then(res => {
            this.items=res.data;
            console.log(this.items);
        })
        .catch(err => console.log(err));
        },
    }
  }
</script>