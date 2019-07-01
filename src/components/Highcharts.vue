<template>
    <div>
        <div class="title"><span>График:</span></div>
        <div id="container" style="width:100%; " ></div>
    </div>
</template>

<script>
import { offset } from 'highcharts';
let Highcharts = require('highcharts');

export default {
  name: 'Highcharts',
  //Наследование свойств от родителя
  props: {
    datahc: {
      required: true
    }
  },
  watch: {
    //Наблюдатель за свойством datahc
    datahc() {
      //Изменение xAxis (осей x)
      this.target.xAxis[0].categories = this.datahc.categories;
      
      // Второй вариант установить толщину блоков:
      //this.target.setSize(null, (120 + ((this.datahc.categories.length != 0 )?this.datahc.categories.length * 80: 80)))

      //Удаление series (полосок)
      while(this.target.series.length != 0) 
        this.target.series[0].remove(true);
      
      //Создание series (полосок)
      this.datahc.series.map((s, key)=>{
          this.target.addSeries({
            data: this.datahc.series[key]['data'],
            name: this.datahc.series[key]['name']
          })
      })

    }
    
  },
  mounted() {
    //Создание экземпляра класса highcharts для отрисовки графика
    this.target = Highcharts.chart('container', {
      chart: {
        type: 'bar',
        spacingBottom: 5,
        spacingTop: 5,
        spacingLeft: 5,
        spacingRight: 5,
        height: 600,
        // Второй вариант установить толщину блоков:
        //height: (120 + ((this.datahc.categories.length != 0 )?this.datahc.categories.length * 80: 80))   + 'px',
      },
      title: {
        text: ''
      },
      xAxis: {
          categories: this.datahc.categories
      },
      yAxis: {
          min: 0,
          title: {
              text: ''
          }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
      },
      legend: {
          reversed: true,
          dataLabels: {
            enabled: true
        }
      },
      plotOptions: {
          series: {
              stacking: 'percent',
              pointWidth: 20, //Tолщина блоков:
              dataLabels: {
                enabled: true,
                format: '{point.percentage:.0f}%',
              }
          }
      },
      series: this.datahc.series
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>