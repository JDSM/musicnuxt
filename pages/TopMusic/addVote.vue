<template>
  <div>
	<v-dialog v-model="dialog.show" persistent max-width="500px">
		<v-card>
			<v-card-title style="background-color:hsl(0, 0%, 94%);">
				<span class="headline">{{dialog.dato[1]}}</span>
			</v-card-title>
			<v-card-text>
				<v-layout wrap>
					<v-flex xs12 sm6 md8>
                        <v-text-field 
							prepend-icon ="account_circle" 
							v-model="form.name" 
							label="Nombre"
							:rules="[() => form.name.length > 0 || 'Nombre Requerido']"  
							required >
						</v-text-field>
						<div style="display: flex;"><v-icon style="padding-right: 10px;">thumb_up</v-icon><VueStars :setRating="setRating"></VueStars></div>
						<v-text-field
							prepend-icon ="lock"  
							v-model="form.password" 
							:append-icon="e1 ?  'visibility_off':'visibility' "
          					:append-icon-cb="() => (e1 = !e1)"
          					:type="e1 ? 'password' : 'text'"
          					name="input-10-1"
							:rules="[() => form.password.length > 0 || 'Ping Requerido']"
          					label="Ingresa el Ping"  
							maxlength="4" 
							required>
						</v-text-field>
					</v-flex>
				</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" flat @click.native="onClose">Cerrar</v-btn>
				<v-btn  color="blue darken-1" flat @click.native="validate">Votar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import VueStars from "~/components/VueStars.vue";
  export default {
	  components: {
        VueStars
    },
	  props: {
			show: {
				type: Boolean,
				default: false,
			},
			mode: {
				type: String,
				default: '',
			},
			fetch: {
				type: Function
			},
			dato:{
				type: Array,
				default: function () {
                    return []
                },
			}
		},
	  data() {
		return {
			dialog: {
				show:false,
                mode:'',
                dato: []
			},
			form:{
                name:'',
                vote:'',
				password: '',
			},
			e1: true
		}
	},
	watch: {
		show(param){
			this.dialog.show= param
		},
		mode(param){
			this.dialog.mode= param
        },
        dato(param){
			this.dialog.dato= param
		}
	},
	mounted () {
		
	},
	methods: {
		setRating (vote) {
			this.form.vote = vote 
		},
		onClose() {
			this.$emit("closeDialog", false)
			this.dialog.show= false
			this.clearForm()
		},
		clearForm(){
                this.form.name = ''
                this.form.vote = ''
				this.form.password= ''
		},
		onSave() {
			let param = {
				idUser: this.id._id,
                urlImg: this.dialog.dato[2],
                vote: this.form.vote,
                artistName: this.dialog.dato[0],
                musicName: this.dialog.dato[1]
            }
            //console.log(param);
			axios.post('http://localhost:3030/TopMusic', param)
				.then(res => {
					//console.log(res)
					this.$toasted.success('Voto Guardado')
					this.clearForm()
				})
				.catch(err => console.log(err));
			this.$emit("closeDialog", false)
			this.dialog.show= false
		},
		validate() {
			let param = {
				name: this.form.name,
				password: this.form.password,
			}
			if(this.form.name=="" || this.form.password=="" || this.form.vote==""){
				this.$toasted.error('Debe completar todos los Campos')
			}
			else{
				axios.get('http://localhost:3030/user/'+this.form.password+'-'+this.form.name)
					.then(res => {
						if(res.data!=null){
							this.id=res.data;
							console.log(res.data);
							this.onSave();
						}
						else{
							this.$toasted.error('Usuario o Ping incorrectos')
							this.clearForm()
						}
					})
					.catch(err => console.log(err));
				this.$emit("closeDialog", false)
				this.dialog.show= false
			}
		},
	}
  }
</script>