<template>
  <div id="app" class="wrap">
    <BuildGraphBtn v-bind:datahc='datahc' v-on:data-update='dataUpdate' />
    <Highcharts v-bind:datahc='initSeries' />
  </div>
</template>

<script>
//Приложение разбито на два компонента.
//Highcharts - отрисовывает график
//BuildGraphBtn - обрабатывает ввод данных

import Highcharts from './components/Highcharts.vue'
import BuildGraphBtn from './components/BuildGraphBtn.vue'

export default {
  name: 'app',
  // Объявление свойств
  data() {
    return {
      datahc:{
        series: [
            {
              name: 'Скорость',
              data: [5, 3, 4, 7, 2, 1]
            },
            {
              name: 'Форрест Гамп',
              data: [2, 2, 3, 2, 1, 1]
            },
            {
              name: 'Молчание ягнят',
              data: [3, 4, 4, 2, 5, 2]
            }
          ],
        categories: ['1991', '1992', '1993', '1993', '1994', '1995'] 
        }
    }
    
  },
  //Регистрация компонентов  
  components: {
    Highcharts,
    BuildGraphBtn
  },
  //Передача свойств в дочерний компонент 
  computed: {
    initSeries() {
      return this.datahc 
    }
  },
  //Объявление методов
  methods:{
    dataUpdate(data){
      this.datahc = JSON.parse(data)
    }
  }

}
</script>

<style lang="scss">
  @import "./src/styles/style.scss";
</style>
