<template>
  <div>
	<v-dialog v-model="dialog.show" persistent max-width="400px" >
		<v-card>
			<v-card-title  style="background-color:hsl(0, 0%, 94%);" >
				<span class="headline">{{dialog.mode}}Usuario</span>
			</v-card-title>
			<v-card-text>
				<v-layout wrap>
					<v-flex xs12 sm6 md10>
						<v-text-field 
							prepend-icon ="description" 
							v-model="form.name" 
							label="Nombre"
							:rules="[() => form.name.length > 0 || 'Nombre Requerido']" 
							required >
						</v-text-field>
						<v-text-field 
							prepend-icon ="description" 
							v-model="form.lastName" 
							label="Apellido"
							:rules="[() => form.lastName.length > 0 || 'Apellido Requerido']" 
							required>
						</v-text-field>
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
							v-if="dialog.mode=='Nuevo '" 
							required>
						</v-text-field>
						<v-text-field prepend-icon ="lock" v-model="form.password" label="Ping" 
							v-if="dialog.mode=='Editar '" disabled>
						</v-text-field>
					</v-flex>
				</v-layout>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="error" flat @click.native="onClose">Cerrar</v-btn>
				<v-btn v-if="dialog.mode=='Nuevo '" color="info" flat @click.native="onSave">Añadir</v-btn>
				<v-btn v-if="dialog.mode=='Editar '" color="warning" flat @click.native="onEdit">Editar</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
  </div>
</template>
<script>
import VueNotifications from 'vue-notifications'
import axios from 'axios'
  export default {
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
			userId:{
				type: String,
				default: ''
			}
		},
	  data() {
		return {
			dialog: {
				show:false,
				mode:''
			},
			form:{
				name:'',
				lastName: '',
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
		userId(param){
			this.dialog.userId= param
			if(this.dialog.mode=='Editar '){
				this.fetchUserId(this.dialog.userId)
				console.log('UU', this.dialog.userId)
			}
		},
		
	},
	mounted () {
		
	},
	methods: {
		onClose() {
			this.$emit("closeDialog", false)
			this.dialog.show= false
			this.clearForm()
		},
		clearForm(){
				this.form.name = ''
				this.form.lastName= ''
				this.form.password= ''
		},
		fetchUserId(id){
            axios.get('http://localhost:3030/user/' + id)
            .then(res => {
                //console.log(res.data);
                this.form=res.data;
            })
            .catch(err => console.log(err));
        },
		onSave() {
			let param = {
				name: this.form.name,
				lastName: this.form.lastName,
				password: this.form.password,
			}
			if(this.form.name=="" || this.form.lastName=="" || this.form.password==""){
				this.$toasted.error('Debe completar todos los Campos')
				
			}
			else{
				axios.post('http://localhost:3030/user', param)
					.then(res => {
						//console.log(res)
						this.fetch()
						this.clearForm()
						this.$toasted.success('Usuario Guardado')
					})
					.catch(err => console.log(err));
				this.$emit("closeDialog", false)
				this.dialog.show= false
			}
		},
		onEdit() {
			let param = {
				_id: this.form._id,
				name: this.form.name,
				lastName: this.form.lastName,
			}
			if(this.form.name=="" || this.form.lastName=="" || this.form.password==""){
				this.$toasted.error('Debe completar todos los Campos')
				
			}
			else{
				axios.put('http://localhost:3030/user/'+ this.form._id, this.form)
					.then(res => {
						//console.log(res)
						this.fetch()
						this.clearForm()
						this.$toasted.success('Cambio Guardado')
					})
					.catch(err => console.log(err));
				this.$emit("closeDialog", false)
				this.dialog.show= false
			}
		},
	},
  }
</script>
