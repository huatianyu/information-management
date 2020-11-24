<template>
  <div>
    <!-- <full-calendar class="test-fc" :events="fcEvents" 
      first-day='1' locale="fr"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick">
        <template slot="fc-event-card" scope="p">
            <p><i class="fa"></i> {{ p.event.title }} test</p>
        </template>
    </full-calendar> -->
  </div>
</template>
<script>
let demoEvents = [
    {
      title    : 'Sunny 725-727',
      start    : '2019-08-25',
      end      : '2019-08-27',
      cssClass : 'family'
    },
    {
      title : 'birthday',
      start : '2019-08-16',
      end : '2019-08-17',
      cssClass : ['home', 'work']
    },
    {
      title : 'meeting',
      start : '2019-08-21',
      end : '2019-08-22',
          cssClass  : ['family', 'career']

    },
    {
        title : 'Lunfel 2/27-2/28',
        start : '2019-08-24',
        end : '2019-08-26'
    },
    {
        title : 'Group',
        start : '2019-08-20',
        end : '2019-08-21',
    },
    {
        title : 'Lunfel 2/26-3/05',
        start : '2017-08-04',
        end : '2017-08-05'
    },
    {
        title : 'Lunfel 1/27-1/28',
        start : '2017-01-27',
        end : '2017-01-28'
    },
    {
        title : 'Lunfel 1/27-2/2',
        start : '2017-01-27',
        end : '2017-02-02'
    },
    {
        title : 'Lunfel 3/27-3/28',
        start : '2017-03-27',
        end : '2017-03-28'
    },
  ];

export default {
	data () {
		return {
            name:'Sunny!',
            fcEvents : demoEvents
        }
	},
  methods : {
    'changeMonth' (start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },
    'eventClick' (event, jsEvent, pos) {
       console.log('eventClick', event, jsEvent, pos)
    },
    'dayClick' (day, jsEvent) {
      console.log('dayClick', day, jsEvent)
    },
    'moreClick' (day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    }
  },
  components : {
    // 'full-calendar' : require('vue-fullcalendar')
  }
}
</script>
<style lang='scss'>
  .app{
    color:#4dc9a875;
  }

</style>