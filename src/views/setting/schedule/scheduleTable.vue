<template>
  <div class="form-height">
    <material-card
      color="#4dc9a875"
      title="预约"
      :status="!isComplete"
      :showBackBtn="true"
      text="预约患者列表内容"
    >
      <v-form ref="formValidate" lazy-validation>
        <v-row>
          <v-col md="6" sm="12" xl="2" cols="12">
            <v-text-field
              dark
              prepend-icon="mdi-card-bulleted-outline"
              label="放疗ID"
              class="purple-input pa-0"
              v-model="formValidate.radiotherapyNum"
              disabled
            />
          </v-col>
          <v-col md="6" sm="12" xl="2" cols="12">
            <v-text-field
              dark
              label="姓名"
              class="purple-input pa-0"
              v-model="formValidate.patientName"
              disabled
            />
          </v-col>
          <v-col md="6" sm="12" xl="2" cols="12">
            <v-text-field
              dark
              label="电话"
              class="purple-input pa-0"
              v-model="formValidate.phoneNumber"
              disabled
            />
          </v-col>
          <v-col md="6" sm="12" xl="2" cols="12">
            <v-text-field
              dark
              label="主管医师"
              class="purple-input pa-0"
              :value="ChiefDoctorsForRead(formValidate.chiefDoctorId)"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              dark
              v-model="formValidate.radiotherapyMachine"
              :items="RadiotherapyMachine"
              prepend-icon="mdi-anchor"
              menu-props="auto"
              :rules="[v => !!v || '请选择加速器']"
              required
              label="加速器"
              :disabled="isComplete"
              placeholder="请选择加速器"
            ></v-select>
          </v-col>
          <v-col md="6" sm="12" xl="2" cols="12">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              dark
              min-width="290px"
              :disabled="isComplete"
            >
              <template v-slot:activator="{on}">
                <v-text-field
                  v-model="formValidate.schedulingDate"
                  dark
                  label="预约日期"
                  prepend-icon="mdi-alarm-snooze"
                  :rules="[v => !!v || '请选择预约日期']"
                  required
                  v-on="on"
                  placeholder="请选择预约日期"
                  :disabled="isComplete"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="formValidate.schedulingDate"
                no-title
                scrollable
              >
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="menu = false">取消</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)"
                  >确定</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="4">
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              max-width="290px"
              min-width="290px"
              :disabled="isComplete"
            >
              <template v-slot:activator="{on}">
                <v-text-field
                  v-model="formValidate.schedulingTime"
                  label="预约时间"
                  dark
                  :rules="[v => !!v || '请选择预约时间']"
                  required
                  :disabled="isComplete"
                  placeholder="请选择预约时间"
                  prepend-icon="mdi-watch"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                dark
                header-color="#4dc9a875"
                locale="zh-cn"
                v-if="menu2"
                :allowed-minutes="allowedMinutes"
                v-model="formValidate.schedulingTime"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-select
              v-model="formValidate.appointmentType"
              :items="AppointmentType"
              prepend-icon="mdi-anchor"
              menu-props="auto"
              :rules="[v => !!v || '请选择预约类型']"
              required
              dark
              label="预约类型"
              placeholder="请选择预约类型"
              :disabled="isComplete"
            ></v-select>
          </v-col>
          <v-col>
            <v-btn color="#4dc9a875" @click="creatSchedule">自动预约</v-btn>
            <v-btn
              v-if="isComplete"
              color="#4dc9a875"
              @click="isComplete = !isComplete"
              >修改</v-btn
            >
            <v-btn v-else color="#4dc9a875" @click="submitSchedule">提交</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <!-- <div class="tags-con">
        <tags-page-opened :plans="pageTagsList"></tags-page-opened>
      </div> -->
      <v-tabs
        background-color="blue-grey"
        dark
        v-model="tab"
        next-icon="mdi-arrow-right-bold-box-outline"
        prev-icon="mdi-arrow-left-bold-box-outline"
        show-arrows
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab
          :class="item.time ? 'green' : 'blue-grey'"
          v-for="(item, i) in planList"
          :key="i"
          :href="'#' + item.id"
        >
          <v-row style="width:100px">
            <v-col class="pa-0" cols="12">
              {{ item.name }} <v-icon>mdi-clock</v-icon>
            </v-col>
            <v-col
              class="pa-0"
              :title="item.time ? item.time : '' | date('%Y-%m-%d  %T')"
              v-if="item.time"
            >
              {{ item.time | date('%m-%d %T') }}
            </v-col>
          </v-row>
        </v-tab>
      </v-tabs>
      <!-- <v-tabs-items v-model="tab">
        <v-tab-item
          eager="true"
          v-for="(item, i) in planList"
          :key="i"
          :value="item.id"
        >
          <v-row>
            <v-col class="pa-0" cols="2">
              <v-menu
                ref="menu3"
                v-model="menu3"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                dark
                :disabled="isComplete"
              >
                <template v-slot:activator="{on}">
                  <v-text-field
                    height="40"
                    :value="ditailInfoDate(item.time)"
                    dark
                    label="预约日期"
                    prepend-icon="mdi-alarm-snooze"
                    :rules="[v => !!v || '请选择预约日期']"
                    required
                    v-on="on"
                    placeholder="请选择预约日期"
                    :disabled="isComplete"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :value="ditailInfoDate(item.time)"
                  no-title
                  scrollable
                >
                  <div class="flex-grow-1"></div>
                  <v-btn text color="primary" @click="menu3 = false"
                    >取消</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu3.save(date)"
                    >确定</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col class="pa-0" cols="3">
              <v-menu
                ref="menu4"
                v-model="menu4"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                full-width
                :disabled="isComplete"
              >
                <template v-slot:activator="{on}">
                  <v-text-field
                    height="40"
                    :value="ditailInfoTime(item.time)"
                    label="预约时间"
                    dark
                    :rules="[v => !!v || '请选择预约时间']"
                    required
                    :disabled="isComplete"
                    placeholder="请选择预约时间"
                    prepend-icon="mdi-watch"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  dark
                  header-color="#4dc9a875"
                  locale="zh-cn"
                  v-if="menu4"
                  :value="ditailInfoTime(item.time)"
                  :allowed-minutes="allowedMinutes"
                  full-width
                  @click:minute="$refs.menu4.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col class="py-8" cols="1">其他详细信息</v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items> -->
      <div class="lunarFullCalendar">
        <div class="full-calendar">
          <lunar-full-calendar
            :events="events"
            ref="calendar"
            @event-selected="eventSelected"
            :config="config"
            @day-click="dayClick"
          ></lunar-full-calendar>
        </div>
      </div>
    </material-card>
  </div>
</template>
<script lang="ts">
import {Vue, Inject, Prop, Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Util from '@/lib/util';
import AbpBase from '@/lib/abpbase';
import VueRouter from 'vue-router';
import $ from 'jquery';
import PatientInfo from '@/store/entities/schedule/patientInfo';
import ScheduleTable from '@/store/entities/schedule/scheduleTable';
import GetSchedul from '@/store/entities/schedule/getSchedul';
import Schedule from '@/store/entities/schedule/schedule';
import PlanList from '@/store/entities/schedule/planList';
import ScheduleFormItem from '@/store/entities/schedule/scheduleFormItem';
import {defineLocale} from 'moment';
import Patient from '../../../store/entities/patient';
import {LunarFullCalendar} from 'vue-lunar-full-calendar';
import moment from 'moment';

@Component({
  components: {LunarFullCalendar},
})
export default class Patients extends AbpBase {
  isComplete: Boolean = false;
  requestType: Number;
  currentView: any;
  appointmentType: String = null;
  // planList = [
  //   {name: '1', id: '111111111', time: null},
  //   {name: '2', id: '222222222', time: null},
  //   {name: '3', id: '333333333', time: null},
  //   {name: '4', id: '444444444', time: null},
  //   {name: '5', id: '555555555', time: null},
  //   {name: '6', id: '666666666', time: null},
  //   {name: '7', id: '777777777', time: null},
  //   {name: '8', id: '888888888', time: null},
  //   {name: '9', id: '999999999', time: null},
  //   {name: '10', id: '9991999999', time: null},
  //   {name: '11', id: '9999992999', time: null},
  //   {name: '12', id: '9999399999', time: null},
  //   {name: '13', id: '9999999699', time: null},
  //   {name: '14', id: '9959999999', time: null},
  //   {name: '15', id: '9999909999', time: null},
  //   {name: '16', id: '9999989999', time: null},
  //   {name: '17', id: '9999199999', time: null},
  //   {name: '18', id: '9994999999', time: null},
  // ];

  ditailInfoDate(date) {
    return date ? moment(date).format('YYYY-MM-DD') : null;
  }
  ditailInfoTime(date) {
    return date ? moment(date).format('HH:mm') : null;
  }
  data() {
    let self = this;
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      time: null,
      tab: null,
      currentStartTime: '',
      ruleValidate: {
        schedulingTime: [
          {
            required: true,
            message: '登记时间不能为空',
            trigger: 'blur',
          },
        ],
        schedulingDate: [
          {
            required: true,
            type: 'date',
            message: '预约日期不能为空',
            trigger: 'blur',
          },
        ],
        appointmentType: [
          {
            required: true,
            type: 'number',
            message: '预约类型不能为空',
            trigger: 'blur',
          },
        ],
      },
      showAllSearch: false,
      config: {
        lunarCalendar: true,
        height: 'parent',
        locale: 'zh-cn',
        buttonText: {
          today: '今天',
          month: '月',
          week: '周',
          day: '日',
          list: '列表',
        },
        validRange: function(nowDate) {
          return {
            start: nowDate - 24 * 60 * 60 * 1000,
          };
        },
        renderEvent: function(dd) {},
        selectAllow: function(clickInfo) {
          //禁止点击的控制,是否允许点击false不让点击，  将用户选择限制到某些时间窗口。仅当selectable选项是激活状态时可用。值为事件id或对象。
          var start = clickInfo.start.unix(); //获取点击的开始时间
          //如果大于当前时间就让点击，否则就不让点击，提示
          // alert("农历数据：" + (window as any).lunar(start._d).cnDay);
          if (
            (window as any).lunar(clickInfo.start._d).cnDay === '日' ||
            (window as any).lunar(clickInfo.start._d).cnDay === '六'
          ) {
            return false;
          }
          if (self.isComplete) {
            return false;
          }
          if (clickInfo.start < new Date()) {
            return false;
          }
          //不让点击了 提示
          var event = {
            name: '',
            color:
              self.formValidate.appointmentType == 1 ? '#4dc9a875' : 'pink',
            id: (self as any).tab,
            title: self.formValidate.patientName,
            radiotherapyNum: self.formValidate.radiotherapyNum,
            type: self.formValidate.appointmentType,
            start: clickInfo.start._d.getTime(),
            end: clickInfo.start._d.setTime(
              clickInfo.start._d.getTime() + 10 * 60 * 1000
            ),
          };
          var nextIndex;
          self.planList.forEach((item, index) => {
            if (item.id == (self as any).tab) {
              event.name = item.name;
              (item.time = event.start), (nextIndex = index + 1);
            }
          });
          if (nextIndex != self.planList.length) {
            (self as any).tab = self.planList[nextIndex].id;
          }
          self.pushEvents(event);
          return true;
        },
        editable: false,
        eventResize: function(event, dayDelta, revertFunc) {
          if (
            (window as any).lunar(event.start._d).cnDay === '日' ||
            (window as any).lunar(event.start._d).cnDay === '六'
          ) {
            revertFunc();
          } else {
            var changedEvent = {
              name: '',
              borderColor: 'black',
              color:
                self.formValidate.appointmentType == 1 ? '#4dc9a875' : 'pink',
              id: event.id,
              title: self.formValidate.patientName,
              radiotherapyNum: self.formValidate.radiotherapyNum,
              type: 1,
              start: event.start._d.getTime(),
              end: event.end._d.getTime(),
            };
            self.pushEvents(changedEvent);
          }
        },

        eventDrop: function(event, dayDelta, revertFunc) {
          if (
            (window as any).lunar(event.start._d).cnDay === '日' ||
            (window as any).lunar(event.start._d).cnDay === '六'
          ) {
            revertFunc();
          } else {
            var changedEvent = {
              name: '',
              borderColor: 'black',
              color:
                self.formValidate.appointmentType == 1 ? '#4dc9a875' : 'pink',
              id: event.id,
              title: self.formValidate.patientName,
              radiotherapyNum: self.formValidate.radiotherapyNum,
              type: 1,
              start: event.start._d.getTime(),
              end: event.start._d.getTime() + 10 * 60 * 1000,
            };
            self.pushEvents(changedEvent);
          }
        },
        scrollTime: '08:30:00',
        header: {
          left: 'prev,next, today ',
          center: 'title',
          right: 'hide, custom,agendaDay,agendaWeek,list',
        },
        // eventOrder: "index", // 这个是控制事件排序的功能，意思是 按照字段 事件数据中index来排序
        // eventLimitClick: "day", //点击今天日列表图
        slotDuration: '00:10:00',
        eventLimit: true, // 一天中显示多少条事件，多了隐藏
        firstDay: 0, // 控制周一周日那个在前面
        defaultView: 'agendaDay',
        allDaySlot: true, // agenda视图下是否显示all-day
        allDayText: '全天', // agenda视图下all-day的显示文本
        timezone: 'local', // 时区默认本地的
        slotLabelFormat: 'HH:mm', // 周视图和日视同的左侧时间显示
        viewRender(view, element) {
          self.viewRender(view, element);
        },
      },
    };
  }

  //   get AppointmentTypeForRead() {
  //   return this.ChiefDoctorsForRead(this.formValidate.chiefDoctorId);
  // }

  @Watch('currentStartTime') //切换视图 获取当前视图事件
  async changeCurrentStartTime(newTxt: boolean, oldTxt: boolean) {
    if (!this.formValidate.radiotherapyNum) {
      return;
    }
    var tempEvents = this.events.filter(
      item => this.formValidate.radiotherapyNum === item.radiotherapyNum
    );
    let listDecompost = await this.$store.dispatch({
      type: 'scheduleTable/appointmentDetailedListAsync',
      data: {
        startTime: this.currentView.start._i,
        endTime: this.currentView.end._i,
        radiotherapyNum: this.formValidate.radiotherapyNum,
      },
    });
    var events = listDecompost.concat(tempEvents);
    this.events = this.uniq(events);
  }
  patientInfo: PatientInfo;
  get ChiefDoctors() {
    return this.$store.state.patient.chiefDoctors;
  }
  ChiefDoctorsForRead(id) {
    if (this.ChiefDoctors && this.ChiefDoctors.length) {
      let readItem = (this.ChiefDoctors as any).filter(
        item => item.userId === id
      );
      if (readItem.length) {
        return readItem[0].name;
      }
    }
  }

  get events() {
    var events = this.$store.state.scheduleTable.listDecompost;
    if (events == null) {
      return [];
    }
    return events;
  }

  set events(events) {
    this.$store.state.scheduleTable.listDecompost = events;
  }
  get AppointmentType() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.ScheduleInfo.AppointmentType;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict'))
      .ScheduleInfo.AppointmentType;
  }

  AppointmentTypeForRead(id) {
    let appointMentId = Number(id);
    if (this.AppointmentType && this.AppointmentType.length) {
      let readItem = this.AppointmentType.filter(
        item => item.value === appointMentId
      );

      if (readItem.length) {
        return readItem[0].text;
      }
    }
  }
  get formValidate() {
    this.$store.state.scheduleTable.getSchedul.schedulingTime = '08:30';
    return this.$store.state.scheduleTable.getSchedul as GetSchedul;
  }

  set formValidate(events) {
    this.$store.state.scheduleTable.getSchedul = events as GetSchedul;
  }

  get planList() {
    return this.$store.state.scheduleTable.planList as PlanList[];
  }

  set planList(planList) {
    this.$store.state.scheduleTable.getSchedul = planList as PlanList[];
  }

  get RadiotherapyMachine() {
    if (this.$store.state.app.rtisDict.length) {
      return this.$store.state.app.rtisDict.All.RadiotherapyMachine;
    }
    return JSON.parse(localStorage.getItem('content.state.rtisDict')).All
      .RadiotherapyMachine;
  }

  RadiotherapyMachineForRead(id) {
    if (this.RadiotherapyMachine && this.RadiotherapyMachine.length) {
      let readItem = this.RadiotherapyMachine.filter(item => item.value === id);
      if (readItem.length) {
        return readItem[0].text;
      }
    }
  }
  allowedMinutes(m) {
    return m % 10 === 0;
  }
  dayClick(date, jsEvent, view) {
    if (this.isComplete) {
      this.$Message.warning('未允许修改，不可操作');
    }
  }
  eventSelected(event, jsEvent, view) {
    if (this.isComplete) {
      this.$Message.warning('未允许修改，不可操作');
    }
    if (
      event.radiotherapyNum != this.formValidate.radiotherapyNum ||
      this.isComplete
    ) {
      return;
    }

    this.events = this.events.filter(item => event.id !== item.id);
    this.planList.forEach(item => {
      if (event.id == item.id) {
        item.time = null;
      }
    });
    // this.events = this.events.filter(item => event.start !== item.start);
  }

  viewRender(view, element) {
    $('.fc-day.fc-sat')
      .not('.fc-other-month')
      .css('backgroundColor', '#bce8f1');
    $('.fc-day.fc-sun')
      .not('.fc-other-month')
      .css('backgroundColor', '#bce8f1');
    this.currentView = view;
    (this as any).currentStartTime = this.currentView.start._i;
  }
  pushEvents(event) {
    this.events = this.events.filter(item => event.id !== item.id);
    this.events = this.events.filter(item => event.start !== item.start);
    if (
      !(
        (window as any).lunar(event.start).cnDay === '日' ||
        (window as any).lunar(event.start).cnDay === '六'
      )
    ) {
      this.events.push(event);
    }
  }
  async creatSchedule() {
    if ((this.$refs.formValidate as any).validate()) {
      let self = this;
      // var oldEvents = self.events;
      var events = await this.$store.dispatch({
        type: 'scheduleTable/automaticAppointmentAsync',
        data: this.formValidate,
      });
      self.events = events;
      $('#calendar').fullCalendar('gotoDate', this.formValidate.schedulingDate);
    }
  }

  uniq(array: Array<Schedule>): Array<Schedule> {
    var temp = []; //一个新的临时数组
    let tempNeed = [];
    for (var i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i].id) == -1) {
        temp.push(array[i].id); //把id push到一个新的数组，然后判断这个id有没有重复，没有的话，就把这个对象放进我们想要的数组中，即可得到去重的效果
        tempNeed.push(array[i]);
      }
    }
    return tempNeed;
  }

  // 提交
  async submitSchedule() {
    if ((this.$refs.formValidate as any).validate()) {
      var submitEvents = this.events.filter(
        item => this.formValidate.radiotherapyNum === item.radiotherapyNum
      );
      let success = await this.$store.dispatch({
        type:
          'scheduleTable/' +
          (this.requestType != 0
            ? 'modifySchedulemodeAsync'
            : 'createAppointmentAsync'),
        data: {
          radiotherapyNum: this.formValidate.radiotherapyNum,
          appointmentType: this.formValidate.appointmentType,
          minute: 10,
          appointmentTimeData: submitEvents,
          schedulingDate: this.formValidate.schedulingDate,
          schedulingTime: this.formValidate.schedulingTime,
          deviceId: this.formValidate.deviceId,
          id: this.formValidate.id,
          sessionId: this.formValidate.sessionId,
          radiotherapyMachine: this.formValidate.radiotherapyMachine,
        },
      });
      if (success) {
        this.isComplete = true;
        this.$Message.success('录入成功');
      } else {
        this.$Message.warning('录入失败');
      }
    }
  }

  goback() {
    this.$router.go(-1); //返回上一层
  }
  beforeRouteLeave(to, from, next) {
    this.formValidate.radiotherapyNum = null;
    next();
  }
  async beforeRouteEnter(to, from, next) {
    await next(vm => {
      var SCHEDULETABLEPARAMS;
      // //防止刷新页面数据消失
      // if (from.fullPath === '/') {
      //   SCHEDULETABLEPARAMS = JSON.parse(
      //     localStorage.getItem('SCHEDULETABLEPARAMS')
      //   );
      // } else {
      SCHEDULETABLEPARAMS = to.params;
      //   localStorage.setItem('SCHEDULETABLEPARAMS', to.params);
      // }

      vm.requestType = SCHEDULETABLEPARAMS.type;
      vm.isComplete = SCHEDULETABLEPARAMS.type != 0;
      if (SCHEDULETABLEPARAMS.radiotherapyNum) {
        vm.$store.dispatch({
          type: 'scheduleTable/appointmentDetailedListAsync',
          data: {
            startTime: vm.currentView.start._i,
            endTime: vm.currentView.end._i,
            radiotherapyNum: SCHEDULETABLEPARAMS.radiotherapyNum,
            sessionid: SCHEDULETABLEPARAMS.sessionId,
          },
        });
      }
    });
  }
}
</script>
<style>
.fc-time-grid .fc-slats td {
  height: 50px !important;
}
.v-application a {
  color: honeydew;
  font-weight: 100;
}
.theme--light.v-card > .v-card__text {
  color: #fff;
}
</style>
<style scoped lang="scss">
.form-height {
  height: calc(78vh) !important;
  padding: 0px 20px;
}
$color: #45b984;
@media screen and (min-height: 1057px) {
  .lunarFullCalendar {
    height: 460px;
  }
}
@media screen and (min-height: 937px) and (max-height: 1056px) {
  .lunarFullCalendar {
    height: 450px;
  }
}

.lunarFullCalendar {
  min-width: 900px;
  .full-calendar {
    padding: 20px;
    height: 100%;
    .fc-unthemed thead,
    .fc-unthemed .fc-content,
    .fc-unthemed th,
    .fc-unthemed td,
    .fc-unthemed tbody,
    .fc-unthemed .fc-row,
    .fc-unthemed .fc-list-view,
    .fc-unthemed .fc-popover,
    .fc-unthemed .fc-divider,
    .fc-unthemed .fc-list-heading td {
      border-color: #eaecf1;
    }
    .fc-header-toolbar {
      height: 30px;
      margin-bottom: 0;
      line-height: 30px;
      h2 {
        font-size: 24px;
        color: #000;
      }
    }
    .fc-button {
      height: 30px;
      background: #fff;
      border-color: #fff;
      box-shadow: none;
      padding: 0;
    }
    .fc-today-button {
      font-size: 15px;
      color: $color;
    }
    .fc-show-button,
    .fc-hide-button {
      position: relative;
      width: 80px;
      border: 1px solid #bbbfcd;
      border-radius: 20px;
      font-size: 15px;
      color: #000;
    }
    .fc-next-button,
    .fc-prev-button {
      color: #7d8292;
    }
    .fc-button-group {
      margin-left: 20px;
      font-size: 15px;
      button {
        width: 80px;
        color: #000;
        border: 1px solid #bbbfcd;
      }
      button:first-child {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
      button:last-child {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
      .fc-state-active {
        background: $color;
        color: #fff;
        text-shadow: none;
      }
    }
    .fc-agendaDay-view,
    .fc-month-view,
    .fc-agendaWeek-view {
      .fc-widget-content {
        .fc-sun,
        .fc-sat {
          background: rgba(245, 246, 248, 0.6);
        }
        .fc-day-number {
          font-size: 15px;
          letter-spacing: 0;
          line-height: 13px;
          float: left;
        }
        .fc-day-top {
          padding: 15px 12px 0 12px;
        }
        .fc-day-cnTerm,
        .fc-day-cnDate {
          font-size: 12px;
          color: #7d8292;
          float: right;
        }
        .fc-more {
          font-size: 12px;
          color: #7d8292;
        }
        .fc-event {
          cursor: pointer;
          font-size: 12px;
          color: #000;
          background-color: rgba($color: $color, $alpha: 0.15);
          border: 1px solid rgba($color: $color, $alpha: 0.15) !important;
          border-left: 2px solid rgba($color: $color, $alpha: 0.15) !important;
          border-radius: 0;
        }
        .fc-day-grid-event {
          padding: 1px 0 1px 5px;
        }
      }
    }
    .fc-agendaWeek-view,
    .fc-agendaDay-view {
      .fc-axis {
        font-size: 15px;
      }
      .fc-title {
        font-size: 15px;
        color: $color;
      }
    }
    .fc-month-view {
      .fc-event {
        &.fc-not-start {
          border-left: 1px solid rgba($color: $color, $alpha: 0.1) !important;
        }
      }
    }
    .fc-agendaDay-view {
      .fc-widget-content {
        .fc-sun,
        .fc-sat {
          background: rgba(245, 246, 248, 0.6);
        }
        .fc-day-number {
          font-size: 15px;
          letter-spacing: 0;
          line-height: 13px;
          float: left;
        }
        .fc-day-top {
          padding: 15px 12px 0 12px;
        }
        .fc-day-cnTerm,
        .fc-day-cnDate {
          font-size: 12px;
          color: #7d8292;
          float: right;
        }
        .fc-more {
          font-size: 12px;
          color: #7d8292;
        }
        .fc-event {
          cursor: pointer;
          font-size: 12px;
          color: #000;
          background-color: rgba($color: $color, $alpha: 0.15);
          border: 1px solid rgba($color: $color, $alpha: 0.15) !important;
          border-left: 2px solid rgba($color: $color, $alpha: 0.15) !important;
          border-radius: 0;
        }
        .fc-day-grid-event {
          padding: 1px 0 1px 5px;
        }
      }
    }
    .fc-head {
      .fc-day-header,
      .fc-widget-header,
      .fc-head-container {
        border-top-color: #fff;
        border-left-color: #fff;
        border-right-color: #fff;
      }
      table {
        margin: 10px 0 15px 0;
        font-size: 15px;
        color: #000;
      }
    }
  }
}
</style>
