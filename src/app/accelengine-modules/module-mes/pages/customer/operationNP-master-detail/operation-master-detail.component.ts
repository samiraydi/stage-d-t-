import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';
import 'dhtmlx-gantt';
// Component
import { AECriteria, HybrideComponent, Logger } from 'accelengine-lib';

// Models
import { Customer } from '../../../models/customer.model';

// Services
import { CustomerService } from '../../../services/customer.service';

// Components
import { Column, ColumnType } from '@shared/components/data-table/data-table.model';
import { CriteriaComponent } from '@shared/components/criteria/criteria.component';

// Helpers
import { APP_CONFIG } from '@app/app.config';
import { ChargementBobineSoapService } from '@app/accelengine-modules/module-mes/services/chargement-bobine.soap.service';
import { LinksSoapService } from '@app/accelengine-modules/module-mes/services/links.service.soap.service';
import { DatasSoapService } from '@app/accelengine-modules/module-mes/services/datas.service.soap.service';
import { LinkssSoapService } from '@app/accelengine-modules/module-mes/services/linkss.service.soap.service';
import { StaffSoapService } from '@app/accelengine-modules/module-mes/services/staff.service.soap.service';
import { SaveSoapService } from '@app/accelengine-modules/module-mes/services/save.service.soap.service';
import { DeleteSoapService } from '@app/accelengine-modules/module-mes/services/delete.service.soap.service';
import { PlanifierSoapService } from '@app/accelengine-modules/module-mes/services/planifier.service.soap.service';
import { wrModel } from '@app/accelengine-modules/module-mes/models/data.model';
import { SaveModel } from '@app/accelengine-modules/module-mes/models/save.model';
import { DeleteModel } from '@app/accelengine-modules/module-mes/models/delete.model';
import { StorageService } from '@app/accelengine-core/services/storage.service';
import { SelectableRowDblClick } from 'primeng/table';

const log = new Logger('OperationMasterDetailComponent');
declare let gantt: any;
let eventIDs = [];

@Component({
    templateUrl: 'operation-master-detail.component.html',
    animations: APP_CONFIG.app.animations,
   // template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class OperationMasterDetailComponent extends HybrideComponent<wrModel> implements OnInit,AfterViewInit {

    Source:any
    data:any
    link:any
    staff:any
    text:any
    owner_id:any
    start_date:any
    duration:any
    nbr:any
    lot:any
    op:any
    constructor(
        injector: Injector,
        private customerService: CustomerService,
        private linkServiceSoap:LinksSoapService,
        private dataServiceSoap: DatasSoapService,
        private linksServiceSoap: LinkssSoapService,
        private satffServiceSoap: StaffSoapService,
        private saveServiceSoap: SaveSoapService,
        private deleteServiceSoap: DeleteSoapService,
        private storageService : StorageService,
        private planifierServiceSoap: PlanifierSoapService
    ) {
        super(injector, Customer, customerService, CriteriaComponent);

        // UI Customized DataTable
        this.columns = Column.fromObjects([
            {
                field: 'nbr',
                header: 'N° OF',
                filter: true,
            }, {
                field: 'lot',
                header: 'ID',
                filter: true,
            }, {
                field: 'op',
                header: 'Op',
                filter: true,
                //nbrCol: 5,
            }, {
                field: 'part',
                header: 'Article',
                filter: true,
                //type: ColumnType.BOOLEAN,
            }, {
                field: 'wkctr',
                header: 'Ctr Chrage',
                filter: true,
                //type: ColumnType.BOOLEAN,
            }, {
                field: 'start',
                header: 'Début',
                filter: true,
                //type: ColumnType.BOOLEAN,
            },{
              field: 'dur',
              header: 'Durée',
              filter: true,
              //type: ColumnType.BOOLEAN,
          }, {
                field: 'due',
                header: 'Echéance',
                filter: true,
                //type: ColumnType.BOOLEAN,
            }, {
                field: 'qty_ord',
                header: 'Qté Demandée',
                filter: true,
                //type: ColumnType.BOOLEAN,
            }
        ]);

        this.pagination = true;
        this.criteria = true;
        this.criterias = AECriteria.fromObjects([
            {
                label: 'Code',
                code: 'code',
                operation: '==',
                value: ''
            },
            {
                label: 'Nom',
                code: 'name',
                operation: '==',
                value: ''
            }
        ]);


        // UI Customized Form Validation
        this.formGroup = this.formBuilder.group({
            nbr: [this.selectedData.nbr],
            lot: [this.selectedData.lot],
            op: [this.selectedData.op]
            // name: [this.selectedData.name, [Validators.required]],
            // status: [this.selectedData.status],
            // shortDesc: [this.selectedData.shortDesc],
            // longDesc: [this.selectedData.longDesc]
        });    
    }

    getlinks(){
        this.linkServiceSoap.getLinks().subscribe(data =>
            { this.Source=data;
                if(data)
                {
                    let wr : wrModel[] ;
                    wr=data;
                   // console.log("links=",wr[0]);
                    // console.log(wr[0].operation);
                    // console.log(wr[0].nbr);
                    // console.log(this.Source)
                }
            });
    }

    // charger(item){
    //   this.saveServiceSoap.chargerSave(item.text,item.owner_id,item.start_date,item.duration,item.nbr,item.lot,item.op).subscribe(data=>{
    //     if(data){
    //       log.debug("chargement réussi",data);
    //       this.initData();
    //       console.log("saveeeee",data)
    //     }
    //   })
    // }

    initData() {
      // Do not remove
      super.initData();
      log.debug('Init Data');
      this.dataServiceSoap.getData().subscribe(data =>
          {
              if(data)
              {
                  this.data=data ; 
                  
                  console.log("data=",this.data)
              }
          });

          this.linksServiceSoap.getLinkss().subscribe(link =>
            {
                if(link)
                {
                    this.link=link ; 
                    console.log("link=",this.link)
                }
            });

            this.satffServiceSoap.getStaff().subscribe(staff =>
              {
                  if(staff)
                  {
                      this.staff=staff ; 
                      console.log("staff=",this.staff)
                  }
              }); 
              
              this.ngAfterViewInit()
              this.getlinks();
  }



    ngOnInit(): void {
        this.getlinks();
        log.debug('ngOnInit');
        this.initUI();
        this.initData();
       // this.planifer(text,owner_id,start_date,duration,nbr,lot,op);
    }


    ngAfterViewInit(){
      let task_save;
      setTimeout( ()=>{

        const taskData = {
          "data":this.data,"links":this.link         
        };
    
        // gantt.serverList("departments", [
        //   {key: 1, label: "QA"},
        //   {key: 2, label: "Development"},
        // ]);
        
        gantt.serverList("staff", this.staff );
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

        gantt.config.work_time = true;
        gantt.config.correct_work_time = true;

        gantt.addCalendar({
          id:"8*3", // optional
          worktime: {
              days: [ 1, 1, 1, 1, 1, 1 ,1],
              
                    }
      });
      gantt.addCalendar({
        id:"8*2", // optional
        worktime: {
            days: [ 1, 1, 1, 1, 1, 1 ,1],
            hours:["06:00-22:00"]
                  }
    });
    gantt.addCalendar({
      id:"8*1", // optional
      worktime: {
          days: [ 1, 1, 1, 1, 1, 1 ,1],
          hours:["8:00-12:00", "13:00-17:00"]
                }
      
  });
    +
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
        {name: "id", width: 60, label: "ID", align: "center",sort_state:true},
        {name: "nbr", width: 60, label: "OF", align: "center",sort_state:true},
        {name: "lot", width: 60, label: "ID_OF", align: "center",sort_state:true},
        {name: "op", width: 60, label: "Op", align: "center",sort_state:true},
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
          //if(task.type != gantt.config.types.project){
            //res = +task.duration;
          //}else{
            //res = gantt.getSubtaskDuration(task.id);
         // }
        //  res = gantt.getSubtaskDuration(task.id);
        
         res = +task.duration;
          return res + "h"
        }},
        {name: "add", width: 40}
      ];

      

    ////////////// affichage tableau pour modifer les tasks /////////////////
      gantt.config.lightbox.sections = [
        {name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
        {name: "owner", height: 22, map_to: "owner_id", type: "select", options: gantt.serverList("staff")},
        {name: "time", type: "duration", map_to: "auto",time_format:["%d","%m","%Y","%H:%i"]}
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
      gantt.config.duration_unit = "hour","jour";//an hour
      gantt.config.duration_step = 1;
      gantt.config.work_time = true;
   


      gantt.init("gantt_here");
      gantt.parse(taskData);
    

      gantt.attachEvent("onLightboxDelete", function(id){
         var task = gantt.getTask(id);
        // console.log("dele0")
        // if (task.duration > 60){
        //     alert("The duration is too long. Please, try again");
        //     console.log("dele1")
        //     return false;
        // }
        
          console.log(task.id)
          console.log(task);
          task_save=task;
          localStorage.setItem('task', JSON.stringify(task));
          console.log("dele")
          let element: HTMLElement = document.getElementsByClassName('delete')[0] as HTMLElement;
          element.click();
  
          return true;
      
    })

    
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
    
      var task_saver ;
       //var charge=this.charger;
       
    // function charger_gantt(id){
    //   var item = gantt.getTask(id);
    //   console.log("mochkla",charge(item));
    //   charge(item);
    // }
      gantt.attachEvent("onAfterTaskDrag", function(id, mode, e){
        if (gantt.$groupMode) update_duplicated_tasks(id)
      });
    
      gantt.attachEvent("onLightboxSave", function(id, task, is_new){
        //charger_gantt(id);
        console.log(task.text)
        if (gantt.$groupMode) update_duplicated_tasks(id)
        console.log(task);
        task_save=task;
        localStorage.setItem('task', JSON.stringify(task));
        console.log("addd")
        let element: HTMLElement = document.getElementsByClassName('save')[0] as HTMLElement;
        element.click();
        return true;
      })
    
      const onTaskClick =
      gantt.attachEvent('onTaskClick', (id) => {
        gantt.message(`onTaskClick: Task ID: ${id}`);
        return true;
      }, '');
      eventIDs.push(onTaskClick);

      }, 1000)

    }
   
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
        // window.location.assign("http://localhost:4200/")
        this.initData();
        //this.ngAfterViewInit();
      }

    
      onDblclickRow($event):void{
        // alert("The duration is too long. Please, try again");
        console.log("planifer");
        console.log(($event).nbr,($event).lot,($event).op);
        this.planifierServiceSoap.chargerPlanifier(($event).nbr,($event).lot,($event).op).subscribe(data=>{
          if(data){
            log.debug("chargement réussi",data);
            this.initData();
            console.log("saveeeee",data)
            this.initData();
            
          }
        })

      }


      save():void{
        /* this.storageService.getItemAsync("task").then((value) => {
          let task = value;
          console.log(task);
        }); */
       
        var task = JSON.parse(localStorage.getItem('task'));
        console.log("Task typescript ",task);
        this.saveServiceSoap.chargerSave(task.text,task.owner_id,task.start_date,task.duration,task.nbr,task.lot,task.op).subscribe(data=>{
              if(data){
                log.debug("chargement réussi",data);
                this.initData();
                console.log("saveeeee",data)
                localStorage.removeItem('task');
              }
            })

            
      }


      delete():void{
        /* this.storageService.getItemAsync("task").then((value) => {
          let task = value;
          console.log(task);
        }); */
       
        var task = JSON.parse(localStorage.getItem('task'));
        // console.log("Task typescript delete ",task);
        this.deleteServiceSoap.chargerDelete(task.nbr,task.lot,task.op).subscribe(data=>{
              if(data){
                log.debug("chargement réussi",data);
                this.initData();
                console.log("delete",data)
                localStorage.removeItem('task');
              }
            })

            // this.ngAfterViewInit()
              this.getlinks();
      }

      // Init
    initUI() {
      // Do not remove
      super.initUI();
      log.debug('Init UI');
  }
}