riot.tag2('rg', '<div class="riotGrid"> <div class="riotGridHeader"> <span if="{allowSearch==true}"> <input type="text" id="txtSearch" placeholder="enter text to search"> <button type="button" onclick="{btnSearchClicked}"><i class="glyphicon glyphicon-search"></i>&nbsp;Search</button> <button type="button" onclick="{btnClearSearchClicked}"><i class="glyphicon glyphicon-remove"></i>&nbsp;Clear</button> </span> <button type="button" if="{allowAddNew==true}" onclick="{btnAddNewClicked}"><i class="glyphicon glyphicon-plus"></i>Add New</button> <button type="button" if="{allowExport==true}" onclick="{btnExportClicked}"><i class="glyphicon glyphicon-export"></i>&nbsp;Export to CSV</button> <button type="button" onclick="{btnShowFilters}" if="{allowFilters==true}" class="btn {btn-info: !showFilters, btn-danger: showFilters} btn-sm"> <i class="glyphicon glyphicon-filter"></i>&nbsp;{showFilters==true? \'Hide Filters\': \'Show Filters\'} </button> <span style="float: right">Total: &nbsp;{formatNumber(data.length)} records</span> </div> <div class="riotGridBody"> <div> <div class="riotGridBodyDetail"> <table class="table tableBody"> <thead> <tr> <th each="{cols}" riot-style="width:{width? width:\'50px\'}" data-field="{id}"><a data-field="{id}" onclick="{sortData}">{title}</a></th> </tr> <tr show="{showFilters}"> <th each="{cols}" riot-style="width:{width? width:\'50px\'}" data-field="{id}"><input type="text" class="input-filter" onkeyup="{filterData}" data-field="{id}"></th> </tr> </thead> <tbody> <tr data-is="rg-cells" each="{e, index in gridData}" class="{e.css} {selectedRow: Item[key] == e[key]}" ondblclick="{rowDbClick}" onclick="{rowClicked}"></tr> </tbody> </table> </div> </div> </div> <div class="riotGridFooter"> <div class="btnLeft"> <div class="btnGroup" show="{Item}"> <input each="{buttonLefts}" type="button" class="btn-link {css}" data-field="{value}" onclick="{btnClicked}" value="{btnName}" name="{name}"> </div> </div> <div class="paging"> <button type="button" onclick="{btnFirstRecordClicked}" __disabled="{!(selectedPage>0)}"> <strong><<</strong> </button> <button type="button" onclick="{btnPreRecordClicked}" __disabled="{!(selectedPage>0)}"> <strong><</strong> </button> <select id="cboPages" onchange="{cboPagesChanged}"> <option value="{pageNo}" each="{pages}" __selected="{selectedPage==pageNo}">{pageNo+1}</option> </select> <span>/{pages.length}</span> <button type="button" onclick="{btnNextRecordClicked}" __disabled="{!(selectedPage<pages.length-1)}"> <strong>></strong> </button> <button type="button" onclick="{btnLastRecordClicked}" __disabled="{!(selectedPage<pages.length-1)}"> <strong>>></strong> </button> </div> <div class="btnRight"> <div class="btnGroup" show="{Item}"> <input each="{buttonRights}" type="button" class="btn-link {css}" data-field="{value}" onclick="{btnClicked}" value="{btnName}" name="{name}"> </div> </div> </div> </div>', 'rg a,[riot-tag="rg"] a,[data-is="rg"] a{ cursor: pointer; } rg .paging,[riot-tag="rg"] .paging,[data-is="rg"] .paging{ text-align: center; align-content: center; display: table-cell; width: 33.33%; } rg .btnRight,[riot-tag="rg"] .btnRight,[data-is="rg"] .btnRight{ display: table-cell; align-content: flex-end; width: 33.33%; text-align: right; } rg .btnLeft,[riot-tag="rg"] .btnLeft,[data-is="rg"] .btnLeft{ display: table-cell; align-content: flex-start; width: 33.33%; } rg .rg-left,[riot-tag="rg"] .rg-left,[data-is="rg"] .rg-left{ text-align: left; } rg .rg-right,[riot-tag="rg"] .rg-right,[data-is="rg"] .rg-right{ text-align: right; } rg .rg-center,[riot-tag="rg"] .rg-center,[data-is="rg"] .rg-center{ text-align: center; } rg .btn-link,[riot-tag="rg"] .btn-link,[data-is="rg"] .btn-link{ margin-left: 2px; margin-right: 4px; } rg .btn-grid,[riot-tag="rg"] .btn-grid,[data-is="rg"] .btn-grid,rg .headerNo,[riot-tag="rg"] .headerNo,[data-is="rg"] .headerNo{ } rg .riotGridHeader,[riot-tag="rg"] .riotGridHeader,[data-is="rg"] .riotGridHeader,rg .riotGridBody,[riot-tag="rg"] .riotGridBody,[data-is="rg"] .riotGridBody{ display: block; width: 100%; padding: 3px; border: 1px solid #000; } rg .riotGridFooter,[riot-tag="rg"] .riotGridFooter,[data-is="rg"] .riotGridFooter,rg .riotGridHeader,[riot-tag="rg"] .riotGridHeader,[data-is="rg"] .riotGridHeader{ background-color: #fb9797; } rg .riotGridFooter,[riot-tag="rg"] .riotGridFooter,[data-is="rg"] .riotGridFooter{ display: flex; width: 100%; padding: 3px; border: 1px solid #000; } rg .riotGridBodyDetail,[riot-tag="rg"] .riotGridBodyDetail,[data-is="rg"] .riotGridBodyDetail{ max-width: 100%; overflow-y: auto; height: 500px; margin: 0px; } rg .riotGridBody,[riot-tag="rg"] .riotGridBody,[data-is="rg"] .riotGridBody{ max-width: 100%; overflow: auto; } rg ::-webkit-scrollbar,[riot-tag="rg"] ::-webkit-scrollbar,[data-is="rg"] ::-webkit-scrollbar{ width: 0.5em; height: 0.5em; } rg ::-webkit-scrollbar-track,[riot-tag="rg"] ::-webkit-scrollbar-track,[data-is="rg"] ::-webkit-scrollbar-track{ -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); } rg ::-webkit-scrollbar-thumb,[riot-tag="rg"] ::-webkit-scrollbar-thumb,[data-is="rg"] ::-webkit-scrollbar-thumb{ background-color: maroon; outline: 1px solid red; } rg .riotGridFixHeader,[riot-tag="rg"] .riotGridFixHeader,[data-is="rg"] .riotGridFixHeader{ max-width: 100%; overflow: hidden; margin: 0px; padding-right: 5px; } rg .table tbody,[riot-tag="rg"] .table tbody,[data-is="rg"] .table tbody{ overflow-y: scroll } rg .table,[riot-tag="rg"] .table,[data-is="rg"] .table{ border-spacing: 0; table-layout: fixed; } rg .table td,[riot-tag="rg"] .table td,[data-is="rg"] .table td,rg th,[riot-tag="rg"] th,[data-is="rg"] th{ border: 1px solid #eee; padding: 3px; overflow: hidden; white-space: nowrap; } rg .table th,[riot-tag="rg"] .table th,[data-is="rg"] .table th{ text-align: center; font-weight: bold; background-color: black; color: yellow; } rg .table tr:hover,[riot-tag="rg"] .table tr:hover,[data-is="rg"] .table tr:hover{ background-color: #00ffff !important; } rg .table th.resizing,[riot-tag="rg"] .table th.resizing,[data-is="rg"] .table th.resizing{ cursor: col-resize; } rg .table th input,[riot-tag="rg"] .table th input,[data-is="rg"] .table th input{ width: 100%; max-width: 100%; background-color: yellow; border: 0.01em solid #808080; } rg .selectedRow,[riot-tag="rg"] .selectedRow,[data-is="rg"] .selectedRow{ background-color: yellow; } rg .rg-checkbox,[riot-tag="rg"] .rg-checkbox,[data-is="rg"] .rg-checkbox{ cursor: pointer; width: 16px; height: 16px; display: block; background-repeat: no-repeat; margin: 0 auto; }', '', function(opts) {
        this.cols = [];
        this.data = [];
        this.rawData = [];
        this.gridData = [];
        this.pages = [];
        this.sorted = { field: 'ID', sort: 'desc' };
        this.Item = null;
        this.showFilters = false;
        this.rowNoWidth = 30;
        this.buttonLefts = [];
        this.buttonRights = [];

        this.listCount = 10;
        this.selectedPage = 0;
        this.gridHeight = '500px';
        this.gridName = 'RiotGrid';
        this.gridWidth = null;
        this.allowSelect = true;
        this.allowDelete = true;
        this.allowAddNew = true;
        this.allowExport = true;
        this.allowSearch = true;
        this.allowFilters = true;
        this.showRowNo = false;
        this.buttons = [];
        this.buttonPosition = 'left';
        this.press = false;
        this.moving = false;
        this.key = 'ID';
        this.allowResizeCol = false;
        var self = this;
        var startX, startWidth, col;

        var self = this;

        this.loadData = function (data, options) {

            var obj = Object.assign({}, options);
            for (var d in obj) {
                self[d] = obj[d];
            }

            self.buttonLefts = [];
            self.buttonRights = [];

            if (self.buttons && self.buttons.length > 0) {
                self.buttonLefts = new jinqJs()
                                .from(self.buttons)
                                .where(function (row) { return row.buttonPosition == null || row.buttonPosition == 'left' })
                                .select();

                self.buttonRights = new jinqJs()
                                .from(self.buttons)
                                .where(function (row) { return row.buttonPosition == 'right' })
                                .select();
            }

            self.jsonToArray(data);
            self.update();

        }

        this.mouseEventInit = function () {
            if (self.allowResizeCol) {

                this.root.addEventListener("mouseup", function (e) {
                    if (col != null && self.moving == true && self.press == true) {
                        col.className = col.className.replace(/resizing/g, '')
                        self.press = false;
                        self.moving = false;

                        for (var i in self.cols) {
                            if (self.cols[i].id == col.getAttribute('data-field')) {
                                self.cols[i].width = col.style.width;
                                break;
                            }
                        }

                        col = null;
                    }
                }, false);
                this.root.addEventListener("mousemove", function (e) {
                    if (col) {
                        if (self.press) {

                            if ((e.pageX - startX) != 0) {
                                var val = startWidth + (e.pageX - startX);

                                col.style.width = val + 'px';
                                self.moving = true;
                                return
                            }

                        }
                    }
                }, false);
            }
        }

        this.mousedown = function (e) {
            if (self.allowResizeCol) {
                startX = e.pageX;
                startWidth = e.target.offsetWidth;
                self.press = true;
                col = e.target;

                col.className += ' resizing';
                self.mouseEventInit();
            }
        }

        this.btnAddNewClicked = function () {
            self.trigger('add', null);
        }

        this.reformatGrid = function () {
            var riotGridBodyDetail = this.root.getElementsByClassName("riotGridBodyDetail")[0];
            riotGridBodyDetail.style.height = self.gridHeight.toString();

            var tableBody = this.root.getElementsByClassName("tableBody")[0];
            if (tableBody) {

                if (self.gridWidth)
                    tableBody.style.width = self.gridWidth;

                if (self.allowResizeCol) {
                    var row = tableBody.getElementsByTagName('tr')[0];
                    var tr = row;
                    for (var j in row.childNodes) {
                        var td = row.childNodes[j];
                        if (typeof td == 'object' && td.tagName == 'TH') {
                            td.removeEventListener('mousedown', self.mousedown, false);
                            td.addEventListener("mousedown", self.mousedown, false);
                        }
                    }
                }

                return;
            }
        }

        this.on('update', function () {

            if (self.cols.length == 0) {
                var arr = [];
                var a = document.getElementsByClassName('tableBody')[0];
                if (a) {
                    a = a.getElementsByTagName('tbody')[0];
                    a = a.getElementsByTagName('tr')[0];
                    if (a) {
                        a = a.getElementsByTagName('td');
                        for (var i = 0; i < a.length; i++) {
                            var td = a[i];
                            var obj = {
                                id: td.getAttribute('data-field'),
                                width: td.getAttribute('rg-width') ? td.getAttribute('rg-width') : '50px',
                                title: td.title ? td.title : td.id
                            }
                            arr.push(obj);
                        }
                        self.cols = arr.slice();
                    }
                }
            }
        })

        this.on('updated', function () {
            self.reformatGrid();
        })

        this.item = function (itemKey) {
            for (var d in self.gridData) {
                var e = self.gridData[d];
                if (e[self.key] == itemKey) {
                    return self.gridData[d];
                }
            }
        }

        this.rowClicked = function (e) {
            self.Item = e.item.e;
            self.trigger('rowClicked', self.Item);

            var obj = e.target;

            var cell = {
                item: self.Item,
                cell: obj
            }
            self.trigger('cellClicked', cell);
            if (obj.className && obj.className.toString().toLowerCase().indexOf('rg-checkbox') >= 0) {
                e.item.e[obj.dataset.field] = !e.item.e[obj.dataset.field];
                self.trigger('chkClicked', cell);
            }
        }

        this.rowDbClick = function (e) {
            self.trigger('rowDbClick', self.Item);

            var obj = e.target;
            var cell = {
                item: self.Item,
                cell: obj
            }
            self.trigger('cellDbClick', cell);
        }

        this.btnClicked = function (e) {
            var item = self.Item;
            if (e.item.type == 'checkbox' || e.item.type == 'radio') {
                item.checked = e.target.checked;
            }
            self.trigger(e.item.triggerName, item);
        }

        this.btnShowFilters = function () {
            if (self.showFilters) {
                self.data = self.rawData.slice();
                self.getPages();
            }
            self.showFilters = !self.showFilters;
        }

        this.filterData = function (e) {
            self.data = self.rawData.slice();

            if (self.data.length > 0) {

                var txt = self.root.getElementsByClassName('input-filter');
                for (var i = 0; i < txt.length; i++) {

                    var n = txt[i].getAttribute('data-field');
                    var s = txt[i].value.toLowerCase();

                    if (s.length > 0) {

                        console.log(s);

                        self.data = new jinqJs()
                            .from(self.data)
                            .where(function (row) {
                                return row[n].toString().toLowerCase().indexOf(s) >= 0;
                            }).select();
                    }
                }

            }

            self.getPages();
        }

        this.btnExportClicked = function (e) {
            self.exportCSV(self.data, self.gridName, true);
        }

        this.btnClearSearchClicked = function () {
            self.data = self.rawData.slice();
            self.txtSearch.value = '';
            self.getPages();
        }

        this.btnSearchClicked = function () {

            self.data = self.rawData.slice();

            var s = self.txtSearch.value.toLowerCase();
            if (s.length > 0) {
                self.data = new jinqJs()
                        .from(self.data)
                        .where(function (row) {

                            var bl = false;
                            for (var c in self.cols) {
                                if (bl == false) {
                                    var val = row[self.cols[c].id];
                                    if (val) {
                                        val = val.toString().toLowerCase();
                                        bl = (val.indexOf(s) >= 0) ? true : false;
                                    }
                                }
                            }

                            return bl;
                        }).select();
            }

            self.getPages();
        }

        this.getPages = function () {
            self.pages = [];
            var pageCount = parseInt(self.data.length / self.listCount);
            if (pageCount < (self.data.length / self.listCount)) pageCount++;
            for (var i = 0; i < pageCount; i++) {
                self.pages.push({ pageNo: i });
            }

            self.pageChanged();
        }

        this.sortData = function (e) {
            if (self.data.length > 0) {
                var n = e.srcElement.dataset.field;
                if (self.sorted.field == n) {
                    self.sorted.sort = self.sorted.sort == 'asc' ? 'desc' : 'asc';
                }
                else {
                    self.sorted.field = n;
                    self.sorted.sort = 'asc';
                }

                var sortlist = [];
                sortlist.push(self.sorted);

                self.data = new jinqJs()
                           .from(self.data)
                           .orderBy(sortlist)
                           .select();
            }
            self.pageChanged();
        }

        this.jsonToArray = function (res) {
            if (res != null) {
                self.data = res;
                self.rawData = self.data.slice();

                self.getPages();
            }
            else {

            }
        }

        this.cboPagesChanged = function () {
            self.selectedPage = self.cboPages.value;
            self.pageChanged();
        }

        this.pageChanged = function () {
            self.gridData = [];
            if (self.data.length > 0) {
                self.gridData = self.data.slice((self.selectedPage * self.listCount),
                                                (self.selectedPage * self.listCount) + self.listCount);

                for (var i = 0; i < self.gridData.length; i++) {
                    self.gridData[i].rowNo =  (self.selectedPage * self.listCount) + i + 1;
                }
            }

            self.Item = null;
            self.trigger('pageChanged', self.selectedPage + 1);
            if (self.cols.length == 0)
                self.update();

        }

        this.btnPreRecordClicked = function () {
            self.selectedPage = self.selectedPage - 1;
            if (self.selectedPage < 0) self.selectedPage = 0;
            self.pageChanged();
        }

        this.btnFirstRecordClicked = function () {
            self.selectedPage = 0;
            self.pageChanged();
        }

        this.btnLastRecordClicked = function () {
            self.selectedPage = self.pages.length - 1;
            self.pageChanged();
        }

        this.btnNextRecordClicked = function () {
            self.selectedPage = self.selectedPage + 1;
            if (self.selectedPage > self.pages.length) self.selectedPage = self.pages.length;
            self.pageChanged();
        }

        this.rgFormat = function (txt, format, dec, sym) {
            var val = txt;
            if (format) {
                switch (format) {
                    case 'number':
                        dec = dec ? dec : 0;
                        sym = sym ? sym : '';
                        val = sym + self.formatNumber(parseFloat(val), dec);
                        break;
                    case 'date':
                        val = moment(val).format('DD/MMM/YYYY');
                        break;
                    case "bool":
                        val = (val == true) ? 'YES' : 'NO';
                        break;
                    default:
                        break;
                }
            }

            return val;
        }

});

riot.tag2('rg-raw', '', '', '', function(opts) {
        this.on('update', function () {
            this.root.innerHTML = opts.content;
        })
});
riot.tag2('rg-checkbox', '', '', '', function(opts) {
        this.on('update', function myfunction() {
            this.root.innerHTML = '<input data-field="' + opts.dataField + '" class="rg-checkbox" type="' + opts.type + '" ' + (opts.content ? 'checked' : '') + '>';
        })
});
