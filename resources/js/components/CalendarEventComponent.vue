<template>
  <Card dis-hover class="calendar-event-template">
    <p slot="title">
      <b>Calendar</b> 
    </p>
    <Row :gutter='12'>
      <Col :xs="24" :sm="24" :md="6" :lg="6">
        <p class="margins">Event</p>
        <Input 
          v-model="form.eventName"
          placeholder="My Event"
          icon="md-calendar"
          style="width:80%"/>
          <div class="margins" style="float:left;margin-right:8px">
              <p>From:</p>
              <DatePicker 
                v-model="form.startDate" 
                placeholder="Select date" 
                style="width:150px"
                type="date" />
          </div>
          <div class="margins" style="display:inline-block">
              <p>To:</p>
              <DatePicker 
                v-model="form.endDate" 
                :options="datePickerOption" 
                placeholder="Select date"
                style="width:150px"                               
                type="date"/>    
          </div>
        <Row class="margins">
          <CheckboxGroup v-model="form.daysSelected">
            <Checkbox 
              v-for="day in days" 
              :label='day'
              :key="day"/>
          </CheckboxGroup>
        </Row>
        <Button 
          type="primary" 
          @click="saveEvent">
            Save
        </Button>
      </Col>
      <Col :xs="24" :sm="24" :md="18" :lg="18">      
        <div v-if="Object.keys(dateMonthly).length > 0">
          <CalendarListComponent 
            :title="eventDb.title" 
            :dateMonthly="dateMonthly" 
            :days="eventDb.days"/>
        </div>
        <p v-else style="text-align:center">No events yet.</p>
      </Col>
    </Row>
  </Card>
</template>

<script>
import { RRule } from 'rrule'
import { mapActions } from 'vuex'
import CalendarListComponent from './CalendarListComponent'

export default {
  components:{CalendarListComponent},
  data(){
    return{
      eventDb: {
        title: null,
        from_date: null,
        to_date: null,
        days: []
      },
      form:{
        eventName: null,  
        endDate: null,
        startDate: null,
        daysSelected: [],
      },
      dateMonthly:{},
      days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datePickerOption: {
        disabledDate: date => {
          return date && date.valueOf() < this.form.startDate;
        }
      }
    }
  },
  mounted(){
    this.getLatestEvent().then(
      res=>{
        if(res){
          this.eventDb = res;
          this.initEvent(this.eventDb);
        }
      },
      err=>{
        this.showNotice('Error Latest Event',"error")
      }
    )
  },
  methods:{
    ...mapActions('event',['createEvent','getLatestEvent']),
    initEvent(event){
      this.form.eventName = event.title;
      this.form.daysSelected = JSON.parse(event.days);
      this.eventDb.days = this.form.daysSelected;
      this.form.startDate = event.from_date;
      this.form.endDate = event.to_date;
      this.organizeData();
    },
    saveEvent(){
      if(!this.validateData())return;

      let eventParams = this.readyDataToSave()
      this.createEvent(eventParams).then(
        res=>{
          this.eventDb = res;
          this.organizeData();
          this.showNotice('Event Successfully Saved')
        },
        err=>{
          this.showNotice('Event Error Saved','error')          
        }
      )
    },
    validateData(){
      if(!this.form.eventName){
        this.showNotice('Please add Title','error')
        return false;
      }else if(!this.form.startDate){
        this.showNotice('Please Select From Date','error')
        return false;
      }else if(!this.form.endDate){
        this.showNotice('Please Select To Date','error')
        return false;
      }else{
        return true
      }
    },
    readyDataToSave(){
      return {
        "title" : this.form.eventName,
        "days": JSON.stringify(this.form.daysSelected),
        "from_date" : this.$moment(this.form.startDate,).format("YYYY-MM-DD"),
        "to_date" : this.$moment(this.form.endDate).format("YYYY-MM-DD")
      }
    },
    organizeData(){
      this.dateMonthly={};
      let rRule = new RRule({
        freq: RRule.DAILY,
        dtstart: new Date(this.form.startDate),
        until: new Date(this.form.endDate)
      })
      rRule.all().forEach(date => {
        this.groupByMonth(date);
      });
    },
    showNotice(message,type){
      if(type=='error'){
        this.$Notice.error({
            title: message
        });
        return;
      }

      this.$Notice.success({
          title: message
      });
    },
    groupByMonth(date){
        let d = this.$moment(date).format('MMM YYYY');
        this.dateMonthly[d] = this.dateMonthly[d] || [];
        this.dateMonthly[d].push(date);
    },
    checkDaySelected(day){
      return this.eventDb.days.includes(this.$moment(day).format('ddd'))
    }
  }
}
</script>

<style scoped>
  .calendar-event-template{
    margin: 24px;
  }

  .selected-day{
    background: #EEFCEF;
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .margins{
    margin: 8px 0;
  }

  .event-row{
    border-style: solid;
    border-width: 1px 0px 1px 0px;
    border-color: #ddd;
    line-height: 40px;
    height: 40px !important;
    padding: 0px 8px;
  }
</style>