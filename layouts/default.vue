<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title style="height: 64px; width: 900px;">
        <img 
          style="height: 100%; width: 100%; border-radius: 45%;"
          src="~/assets/Music.jpg"
          alt=""
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>
            About me
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-container>
        <v-layout justify-center>
          <v-flex xs12 sm12>
            <v-card>
              <v-card-title class="cyan darken-1">
                <v-avatar title="Jesús Daniel Serrano Malavé">
                  <img
                    src="~/assets/daniel.jpg"
                    alt="Jesus"
                  >
                </v-avatar>
                <span class="headline white--text">Jesús Daniel Serrano Malavé</span>
                <v-spacer></v-spacer>
                  
              </v-card-title>
              <v-list>
                <v-list-tile >
                  <v-list-tile-action>
                    <v-icon>phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>(+57) 319-758-9618</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider inset></v-divider>
                <v-list-tile >
                  <v-list-tile-action>
                    <v-icon>phone</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>(+57)(031) 9078441</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider inset></v-divider>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>mail</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>jesusdmalave@gmail.com</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider inset></v-divider>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>location_on</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Bogota DC, Colombia</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-card-media height="200px">
                <img
                    src="~/assets/developer.jpeg"
                    alt=""
                >
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          { icon: 'people_outline', title: 'Usuario', to: '/usuarios' },
          { icon: 'music_note', title: 'Itune', to: '/' },
          { icon: 'queue_music', title: 'Top Album', to: '/TopMusic' }
          
          
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'NUXT'
      }
    }
  }
</script>
