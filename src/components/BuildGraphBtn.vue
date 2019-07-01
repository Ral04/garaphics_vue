<template>
    <div class='build-wrap' >
        <div class="title"><span>Генератор графика:</span></div>
        <div class='interface'>
          <div>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Json:</span>
              </div>
              <textarea class="form-control" aria-label="With textarea"  v-model="value"></textarea>
            </div>
          </div>
          <div class='btn-wrap'>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button class="btn btn-outline-primary" @click="dataProcessing()">Построить график</button>
              <button class="btn btn-outline-primary" @click="randomData()">Cгенерировать</button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'BuildGraphBtn',
  //Наследование свойств от родителя
  props: { 
    datahc: {
      required: true
    }
  },
  //Передача данных в шаблон компонента
  data() {
    return {
      value: JSON.stringify(this.datahc)
    }
  },
  //Объявление методов
  methods: {
    dataProcessing() {
      //Проверка валидности json
      try {
          JSON.parse(this.value);
      } catch (e) {
          alert('Невалидный json')
          return false;
      }

      //Передача родительскому компоненту новые свойства
      this.$emit('data-update', this.value)
      
    },
    randomData(){
      //Создание случайных значений
      let Randon = new getRandonData()
      this.value = Randon.getJson()

      //Передача родительскому компоненту новые свойства
      this.$emit('data-update', Randon.getJson())
    }
  }
}

class getRandonData {
  constructor(){
        this.randomLimit = 10,
        this.randomNameY = ['1991', '1992', '1993', '1993', '1994', '1995', '1996', '1997', '1998', '1999'],
        this.randomNameX = ['Скорость', 'Форрест Гамп', 'Молчание ягнят', 'Обратная тяга', 'Зеленая миля', 'Ворон', '12 обезьян', 'Бойцовский клуб', 'Армагеддон', 'Казино'],
        this.x = this.random(),
        this.y = this.random()

  }

  //Инструкция по созданию случайных чисел(с параметрами)
  random(){
    return Math.floor(Math.random() * this.randomLimit) + 1
  }

  //Создание объекта json
  getJson(){
    let rez = {}
    
    rez.series = this.preData('series', this.x)
    rez.categories = this.preData('categories', this.y)

    return JSON.stringify(rez);

  }

  //Перебор базовых значений для формирования случайных параметров
  preData(name, count){
    let i, 
        rez = []

    for (i = 0; i < count; i++) { 
      if(name == 'categories'){
        rez.push(this.randomNameY[i]);

      } else {
        let xData = {name:this.randomNameX[i], data: []}, c

        for (c = 0; c < this.y; c++)
          xData.data[c] = this.random()

        rez.push(xData);
        
      }

    }

    return rez
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>