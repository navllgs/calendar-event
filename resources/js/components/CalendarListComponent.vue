<template>
  <div class="calendar-list-template">
    <div
      v-for="(days,month) in dateMonthly"
      :key='month'
      class="margins">
        <h1>{{month}}</h1>
        <Row 
          class="event-row"
          :class="checkDaySelected(day) ? 'highlight' : ''" 
          v-for="(day,i) in days" :key="i">
            <Col :xs="6" :sm="6" :md="4" :lg="4" span="4">{{day | moment("DD")}} {{day | moment("ddd")}}</Col>
            <Col span="18" class="truncate" v-if="checkDaySelected(day)">{{title}}</Col>
        </Row>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type: String,
      required: true
    },
    dateMonthly:{
      type: Object,
      required: true
    },
    days:{
      type: [Array, String],
      required: true      
    }
  },
  methods:{
    checkDaySelected(day){
      return this.days.includes(this.$moment(day).format('ddd'))
    }
  }
}
</script>

<style scoped>
  .event-row{
    border-style: solid;
    border-width: 1px 0px 1px 0px;
    border-color: #ddd;
    line-height: 40px;
    height: 40px !important;
    padding: 0px 8px;
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .margins{
    margin: 8px 0;
  }

  .highlight{
    background: #EEFCEF;
  }
</style>