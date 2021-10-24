import { Component, OnInit, OnDestroy } from '@angular/core';
import 'dhtmlx-gantt';
// import { Data } from 'src/models/data.model';
// import { MemberService } from 'src/services/member.service';

declare let gantt: any;
let eventIDs = [];

@Component({
  templateUrl: 'dashboard.component.html',
  template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class DashboardComponent implements OnInit,OnDestroy {

  displayedColumns: string[] = ['ID', 'NameTask', 'StartDate'];
  S
  constructor() { }

  ngOnInit(): void {
    // this.Source=this.memberS.tab;
   
  
    const taskData = {
      data: [
        { id: 1, text: 'OF 1',      start_date: "12-07-2021 00:00", duration: 1, parent: 0, progress: 0.4, owner_id: 3, type: "project"},
        { id: 2, text: "OF 2",      start_date: "12-07-2021 00:00", duration: 1, parent: 0, progress: 0.6, owner_id: 3, type: "project"},
        { id: 3, text: "OF 3",      start_date: "12-07-2021 00:00", duration: 1, parent: 0, progress: 0.6, owner_id: 3, type: "project"},

        { id: 11, text: "OF 1-OP1", start_date: "12-07-2021 00:00", duration: 1, parent: 1, progress: 0.5, owner_id: 3, priority:3, color:"red",type: "task"},
        { id: 12, text: "OF 1-OP2", start_date: "13-07-2021 00:00", duration: 1, parent: 1, progress: 0.6, owner_id: 1, priority:1, type: "task"},
        { id: 13, text: "OF 1-OP3", start_date: "14-07-2021 00:00", duration: 1, parent: 1, progress: 0.6, owner_id: 2, priority:2, type: "task"},

        { id: 21, text: "OF 2-OP1", start_date: "15-07-2021 00:00", duration: 1, parent: 2, progress: 0.5, owner_id: 1, priority:3, type: "task"},
        { id: 22, text: "OF 2-OP2", start_date: "16-07-2021 00:00", duration: 1, parent: 2, progress: 0.6, owner_id: 2, priority:1, type: "task"},
        { id: 23, text: "OF 2-OP3", start_date: "17-07-2021 00:00", duration: 1, parent: 2, progress: 0.6, owner_id: 3, priority:2, type: "task"},

        { id: 31, text: "OF 3-OP1", start_date: "18-07-2021 00:00", duration: 1, parent: 3, progress: 0.5, owner_id: 1, priority:3, type: "task"},
        { id: 32, text: "OF 3-OP2", start_date: "19-07-2021 00:00", duration: 1, parent: 3, progress: 0.6, owner_id: 2, priority:1, type: "task"},
        { id: 33, text: "OF 3-OP3", start_date: "20-07-2021 00:00", duration: 1, parent: 3, progress: 0.6, owner_id: 3, priority:2, type: "task"},
        ],
        links: [
        { id: 1, source: 11, target: 12, type: 0 },
        { id: 2, source: 12, target: 13, type: 0 },
        { id: 3, source: 21, target: 22, type: 0 },
        { id: 4, source: 22, target: 23, type: 0 },
        { id: 5, source: 31, target: 32, type: 0 },
        { id: 6, source: 32, target: 33, type: 0 }
        ],
        Source:[
          { id:'4', text:'OF 4', start_date:"12-07-2021 00:00", duration: 1, parent: 0, progress: 0.4, owner_id: 3, type: "project"},
          { id:'5', text:'OF 5', start_date:"12-07-2021 00:00", duration: 1, parent: 0, progress: 0.4, owner_id: 3, type: "project"},
          { id:'6', text:'OF 6', start_date:"12-07-2021 00:00", duration: 1, parent: 0, progress: 0.4, owner_id: 3, type: "project"}
        ]
    };

    // gantt.serverList("departments", [
    //   {key: 1, label: "QA"},
    //   {key: 2, label: "Development"},
    // ]);
    
    gantt.serverList("staff", [
      {key: 1, label: "Machine 1"},
      {key: 2, label: "Machine 2"},
      {key: 3, label: "Machine 3"},
    ]);
/////////////// Zoom ////////////////////
  const zoomConfig = {
    levels: [
      {
        name:"hour",
        scale_height: 27,
        min_column_width:15,
        scales:[
          {unit:"day", format:"%d"},
          {unit:"hour", format:"%H"},
        ]
      },
      {
        name:"day",
        scale_height: 27,
        min_column_width:80,
        scales:[
          {unit: "day", step: 1, format: "%d %M"}
          ]
      },
      {
        name:"week",
        scale_height: 50,
        min_column_width:50,
        scales:[
            {unit: "week", step: 1, format: function (date) {
              var dateToStr = gantt.date.date_to_str("%d %M");
              var endDate = gantt.date.add(date, -6, "day");
              var weekNum = gantt.date.date_to_str("%W")(date);
              return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
              
          }},
          {unit: "day", step: 1, format: "%j %D"}
        ]
        
      },
      {
        name:"month",
        scale_height: 50,
        min_column_width:120,
        scales:[
          {unit: "month", format: "%F, %Y"},
          {unit: "week", format: "Week #%W"}
        ]
      },
      {
        name:"quarter",
        height: 50,
        min_column_width:90,
        scales:[
          {
            unit: "quarter", step: 1, format: function (date) {
              var dateToStr = gantt.date.date_to_str("%M");
              var endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
              return dateToStr(date) + " - " + dateToStr(endDate);
            }
          },
          {unit: "month", step: 1, format: "%M"},
        ]
      },
      {
        name:"year",
        scale_height: 50,
        min_column_width: 30,
        scales:[
          {unit: "year", step: 1, format: "%Y"}
        ]
      }
    ],
    useKey: "ctrlKey",
    trigger: "wheel",
    element: function(){
      return gantt.$root.querySelector(".gantt_task");
    }
  };

    gantt.ext.zoom.init(zoomConfig);
    gantt.ext.zoom.setLevel("week");
    gantt.init('gantt_here');
/////////////// fin Zoom ////////////////////

gantt.config.initial_scroll = false;

gantt.config.auto_scheduling = true;
gantt.config.auto_scheduling_strict = true;
gantt.config.grid_width = 500;
gantt.config.row_height = 24;
gantt.config.grid_resize = true;
gantt.config.open_tree_initially = true;
gantt.config.work_time = true;
gantt.config.order_branch = true;

gantt.locale.labels.section_owner = "Owner";

  function byId(list, id) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].key == id)
        return list[i].label || "";
    }
    return "";
  }
////////////// affichage tableau gantt /////////////////
  gantt.config.columns = [
    {name: "text", label: "Name", tree: true, width: '*'},
    {name: "owner_id", width: 60, label: "ID", align: "center",sort_state:true},
    {name: "owner_id", width: 80, label: "Machine", align: "center", 
    template: function (item) {
      if(item.type == gantt.config.types.project) 
      return ""
      return byId(gantt.serverList('staff'), item.owner_id)
    },sort_state:true},
    {name: "start_date", width: 80,label: "Start", align: "center"},
    {name: "end_date", width: 80,label: "End", align: "center", template:function(task){return gantt.templates.date_grid(task.end_date)}},
    {name: "duration", width: 50, label: "duration", align: "center", template: function(task){
      var res = 0;
      if(task.type != gantt.config.types.project){
        res = +task.duration;
      }else{
        res = gantt.getSubtaskDuration(task.id);
      }
      return res + "d"
    }},
    {name: "add", width: 40}
  ];
////////////// affichage tableau pour modifer les tasks /////////////////
  gantt.config.lightbox.sections = [
    {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
    {name: "owner", height: 22, map_to: "owner_id", type: "select", options: gantt.serverList("staff")},
    {name: "time", type: "duration", map_to: "auto"}
  ];
////////////// fin /////////////////
  gantt.templates.rightside_text = function(start, end, task){
    return byId(gantt.serverList('staff'), task.owner_id);
  };


  // gantt.templates.grid_row_class =
  // gantt.templates.task_row_class =
      gantt.templates.task_class = function (start, end, task) {
        var css = [];
        if (task.type == gantt.config.types.project)
          css.push("summary-bar");

        if (task.$virtual)
          css.push("group-bar");

        return css.join(" ");
  };

  var toggle = false;
  gantt.attachEvent("onBeforeTaskDisplay", function(id, task){
    if (!toggle) return true;
    if (task.original_parent){
        return true;
    }
    return false;
  });

  gantt.config.order_branch = true;
  gantt.config.order_branch_free = true;

  gantt.init("gantt_here");
  gantt.parse(taskData);

  function update_duplicated_tasks(id){
  var item = gantt.getTask(id);
  gantt.eachTask(function(task){
      if (item.original_id == task.original_id && task.id != item.id) {
        task.start_date = item.start_date;
        task.end_date = item.end_date
        task.duration = item.duration
        task.text = item.text
        gantt.refreshTask(task.id)
      }
    })
  }

  gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
    if (gantt.$groupMode) update_duplicated_tasks(id)
  });

  gantt.attachEvent("onLightboxSave", function(id, task, is_new){
    if (gantt.$groupMode) update_duplicated_tasks(id)
    return true;
  })

  const onTaskClick =
  gantt.attachEvent('onTaskClick', (id) => {
    gantt.message(`onTaskClick: Task ID: ${id}`);
    return true;
  }, '');
  eventIDs.push(onTaskClick);

  }
////////////// fin méthode ngOnInit /////////////////
  ngOnDestroy(): void{
    gantt.clearAll();
    eventIDs.forEach(event => gantt.detachEvent(event));
    eventIDs = [];
    const tooltips = <HTMLElement[]><any>document.querySelectorAll('.gantt-info');
    tooltips.forEach(tooltip => tooltip.style.display = 'none' );
  }

  machine(): void {
     var people = gantt.serverList("staff");
     console.log(people);
     people.sort();
    console.log(people.sort());
  }

   sortDate():void{
     console.log("éhhhhh");
    var state = gantt.config.columns[1].sort_state
      console.log(state);
      gantt.sort("owner_id", state);
      console.log(gantt.sort("owner_id", state));
      gantt.config.columns[1].sort_state = !state;
  }

  toggle_visibility():void{
    var toggle = false;
    if (!toggle){
      gantt.eachTask(function(task){
        if (task.parent) {
          task.original_parent = task.parent;
          task.parent = 0;
        }
      })
    }
    if (toggle){
      gantt.eachTask(function(task){
        if (task.original_parent) {
          task.parent = task.original_parent;
          delete task.original_parent;
        }
      })    
    }
    toggle = !toggle;
    gantt.render()
  }

  refresh():void{
    window.location.assign("http://localhost:4200/")
  }

  planifer():void{
    console.log();
  }
  
}
