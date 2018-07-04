<template>
	<div class="star-rating">
        <label 
			    class="star-rating__star" 
			    v-for="(rating, index) in ratings" 
        	:class="{'is-selected': ((value >= rating) && value != null)}" 
        	v-on:click="set(rating)" v-on:mouseover="star_over(rating)" 
			    v-on:mouseout="star_out"
			    :key="index">
            <input class="star-rating star-rating__checkbox" 
              type="radio" :value="rating"
              v-model="value">★
        </label>
	</div>
</template>
<script>
export default {
	props: {
    setRating: Function
	  },
	data: function() {
    	return {
          temp_value: null,
          value: 0,
      		ratings: [1, 2, 3, 4, 5]
    	};
  	},

  	methods: {
    /*
     * Behaviour of the stars on mouseover.
     */
    	star_over: function(index) {
      		var self = this;

      		if (!this.disabled) {
        		this.temp_value = this.value;
        		return this.value = index;
      		}

    	},

    /*
     * Behaviour of the stars on mouseout.
     */
    	star_out: function() {
      		var self = this;

      		if (!this.disabled) {
        		return this.value = this.temp_value;
      		}
    	},

    /*
     * Set the rating.
     */
    	set: function(value) {
      		var self = this;

      		if (!this.disabled) {
            this.temp_value = value;
            this.setRating(value)
        		return this.value = value;
      		}
    	}
  	}
}
</script>
<style >

.star-rating__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
.star-rating__star {
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 2.5em;
  color: #ababab;
  transition: color 0.2s ease-out;
}
.star-rating__star:hover {
  cursor: pointer;
}
.star-rating__star.is-selected {
  color: #ffd700;
}
.star-rating__star.is-disabled:hover {
  cursor: default;
}

</style>
