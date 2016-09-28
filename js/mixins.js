var globalMixins = {
    parents: function (tagName) {
        var p = this;
        tagName = tagName.toUpperCase();
        while (p != undefined && p.root.tagName != tagName) {
            p = p.parent;
        }
        return p;
    },

    checkRequired: function (container) {
        var founded = false;
        $('#' + container).find('.required').each(function (i, e) {
            var item = $(e);
            var val = null;
            if (item.is('textarea')) {
                if (item.hasClass('tinymce')) {
                    val = tinymce.get(item.attr('id')).getContent();
                    item = item.prev();
                }
                else {
                    val = item.val();
                }
            }
            else {
                val = item.val();
            }


            if (val == null || val.length == 0) {
                item.css('background-color', 'pink');
                item.css('border', '2px solid red');
                founded = true;
            }
            else {

                if (item.hasClass('req-number')) {
                    var nan = null;
                    try {
                        nan = parseInt(val);
                    } catch (e) {
                        nan = null;
                    }

                    if (nan == null || isNaN(nan)) {
                        item.css('background-color', 'pink');
                        item.css('border', '2px solid red');
                        founded = true;
                    }
                }
                else {
                    item.css('background-color', '');
                    item.css('border', '1px solid gray');
                }
            }
        });

        return founded;
    },

    prepareData: function (container, oper) {
        var obj = {
            oper: oper
        };

        $('#' + container).find('input,textarea,select').each(function (i, e) {
            var dataName = e.dataset.field;
            var item = $(e);
            var val = null;
            //check the tag
            if (item.is('textarea')) {
                if (item.hasClass('tinymce')) {
                    val = tinymce.get(item.attr('id')).getContent();
                }
                else {
                    val = item.val();
                }
            }
            else if (item.attr('type') == 'checkbox' || item.attr('type') == 'radio') {
                val = item.prop('checked');

            }
            else {
                val = item.val();
            }

            obj[dataName] = val;
        });

        return obj;
    },

    //create the datepicker
    dayPicker: function () {
        $('body').find('.dayPicker').each(function (i, e) {
            var item = $(e);

            if (item.hasClass('timePicker') || item.hasClass('timepicker')) {
                item.datetimepicker({
                    format: 'LT'
                });
            }
            else {
                item.datetimepicker({
                    format: 'DD/MMM/YYYY',
                    defaultDate: new Date()
                });
            }
        });
    },

    timePicker: function () {
        $('body').find('.timePicker').each(function (i, e) {
            var item = $(e);
            item.datetimepicker({
                format: 'LT'
            });

        });
    },

    initTinyMCESingle: function (item) {
        //make the text as tinymce
        try {
            tinymce.EditorManager.execCommand('mceRemoveEditor', true, item.attr('id'));
        } catch (e) {
            console.log(e);
        }

        setTimeout(function myfunction() {

            var max_chars = 2000;
            if (item.attr('max')) {
                max_chars = item.attr('max');
            }
            //max characters
            var max_for_html = max_chars; //max characters for html tags
            var allowed_keys = [8, 13, 16, 17, 18, 20, 33, 34, 35, 36, 37, 38, 39, 40, 46];
            var chars_without_html = 0;
            var chars_with_html = 0;
            var ctrl_h = 200;

            //get the heigh of control
            if (item.attr('rows')) {
                ctrl_h = parseInt(item.attr('rows')) * 65;
            }

            tinymce.init({
                selector: '#' + item.attr('id'),
                statusbar: false,
                height: ctrl_h,
                paste_auto_cleanup_on_paste: true,
                setup: function (ed) {
                    ed.on('KeyUp', function (ed, evt) {
                        chars_without_html = $.trim(tinyMCE.activeEditor.getContent().replace(/(<([^>]+)>)/ig, '')).length;
                        chars_with_html = tinyMCE.activeEditor.getContent().length;
                        var key = ed.keyCode;
                        if (allowed_keys.indexOf(key) != -1) {
                            return;
                        }

                        //clean up data
                        if (chars_without_html > max_chars - 1 && key != 8 && key != 46) {
                            tinyMCE.activeEditor.setContent(tinyMCE.activeEditor.getContent().replace(/&nbsp;/gi, '').substring(0, max_chars));
                            chars_without_html = $.trim(tinyMCE.activeEditor.getContent().replace(/(<([^>]+)>)/ig, '')).length;
                            chars_with_html = tinyMCE.activeEditor.getContent().length;
                        }

                        if (chars_with_html > (max_chars + max_for_html)) {
                            ed.stopPropagation();
                            ed.preventDefault();
                        } else if (chars_without_html > max_chars - 1 && key != 8 && key != 46) {
                            tinyMCE.activeEditor.setContent(tinyMCE.activeEditor.getContent().replace(/(<([^>]+)>)/ig, '').substring(0, max_chars));
                            alert('Characters limit!');
                            ed.stopPropagation();
                            ed.preventDefault();
                        }
                    })
                },
                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks visualchars',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'emoticons template paste textcolor colorpicker textpattern imagetools'
                ],
                toolbar1: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview media | forecolor backcolor emoticons',
                menubar: false  // removes the menubar
            });
        }, 100)
    },

    //textarea must have class name tinymce
    initTinyMCE: function () {
        var self = this;
        $('body').find('.tinymce').each(function (i, e) {
            var item = $(e);
            self.initTinyMCESingle(item);
        });
    },

    setTinyMCEContent: function (Item) {
        $('body').find('.tinymce').each(function (i, e) {
            var item = $(e);
            try {
                tinymce.get(item.attr('id')).setContent(Item == null ? '' : (Item[e.dataset.field]) == null ? '' : Item[e.dataset.field]);
            } catch (e) {
                console.log(e.message);
            }
        });
    },

    reformatDateTextbox: function (Item) {
        $('body').find('.dayPicker').each(function (i, e) {
            var item = $(e);
            e.value = Item == null ? moment(new Date()).format('DD/MMM/YYYY') : moment(Item[e.dataset.field]).format('DD/MMM/YYYY');
        });
    },

    exportCSV: function (JSONData, ReportTitle, ShowLabel) {

        function removeHTML(s) {
            try {
                var regex = /(<([^>]+)>)/ig
                var result = s.replace(regex, '');
                return result;
            } catch (e) {
                return s;
            }

        }

        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
        //Set Report title in first row or line
        CSV += ReportTitle + '\r\n\n';
        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = '';
            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }
            row = row.slice(0, -1);
            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = '';
            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + removeHTML(arrData[i][index]) + '",';
            }
            row.slice(0, row.length - 1);
            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert('Invalid data');
            return;
        }

        //Generate a file name
        var fileName = 'MyReport_';
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, '_');

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    
        //this trick will generate a temp <a /> tag
        var link = document.createElement('a');
        link.href = uri;
        //set the visibility hidden so it will not effect on your web-layout
        link.style = 'visibility:hidden';
        link.download = fileName + '.csv';
        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    showMore: function (e) {
        $('body').find('.showMoreButton').each(function (i, e) {
            var item = $(e);
            item.unbind("click");
            item.on('click', function () {
                if (item.text() == 'more...') {
                    $(e).prev('.showmore').css('height', 'auto');
                    item.text('less...');
                }
                else {
                    $(e).prev('.showmore').css('height', '4em');
                    item.text('more...');
                }
                //alert($(e).prev('.showmore').html());
            })
        });
    },

    numberToHours: function (val, showstring) {
        try {
            var hours = parseInt(val);
            var mins = parseInt((val % 1) * 60)
            if (showstring) {
                return hours.toString() + 'hrs ' + mins.toString() + 'mins';
            }
            else {
                return hours.toString() + ':' + mins.toString();
            }
        } catch (e) {
            return 'error'
        }

    },

    //format th number: 1st, 2nd, 3rd and 4th....
    formatThNumber: function (val) {
        if (val > 0) {
            var th = val.toString();
            th = th.substring(th.length - 1, th.length);
            switch (th) {
                case '1':
                    return val.toString() + 'st';
                case '2':
                    return val.toString() + 'nd';
                case '3':
                    return val.toString() + 'rd';
                default:
                    return val.toString() + 'th';
            }
        }
    },

    //alert box
    alert: function (txt, title) {
        var html = '<div class="modal fade" id="divDynamicAlert" tabindex="-1" role="dialog" aria-labelledby="myModal-label">'
            + '<div class="modal-dialog" role="document">'
            + '<div class="modal-content">'
            + '<div class="modal-header" style="background-color:pink;">'
            + ' <h4 class="modal-title" id="myModal-label" >' + (title == null ? 'Notice' : title) + '</h4>'
            + '</div>'
            + '<div class="modal-body">'
            + '<p>' + txt + '</p>'
            + '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-success" id="btnDynamicAlertClose">Close</button>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';

        $("body").append(html);

        $("#divDynamicAlert").modal('show');

        $('#btnDynamicAlertClose').on('click', function () {
            $("#divDynamicAlert").modal('hide');
            setTimeout(function () {
                $('#divDynamicAlert').remove();
            }, 500)
        })
    },

    //confirm box: message, callback_ok and callbackno, title
    confirm: function (txt, callback_ok, callback_no, title) {
        var html = '<div class="modal fade" id="divDynamicConfirm" tabindex="-1" role="dialog" aria-labelledby="myModal-label">'
            + '<div class="modal-dialog" role="document">'
            + '<div class="modal-content">'
            + '<div class="modal-header" style="background-color:cyan;">'
            + ' <h4 class="modal-title" id="myModal-label" >' + (title == null ? 'Confirm\?' : title) + '</h4>'
            + '</div>'
            + '<div class="modal-body">'
            + '<p>' + txt + '</p>'
            + '</div>'
            + '<div class="modal-footer">'
            + '<button type="button" class="btn btn-success" id="btnDynamicConfirmOK">YES</button>'
            + '<button type="button" class="btn btn-success" id="btnDynamicConfirmClose">NO</button>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';

        $("body").append(html);
        $("#divDynamicConfirm").modal('show');

        //if NO button
        $('#btnDynamicConfirmClose').on('click', function () {
            $("#divDynamicConfirm").modal('hide');
            setTimeout(function () {
                if (callback_no != null) callback_no();
                $('#divDynamicConfirm').remove();
            }, 500)
        })

        //if YES button
        $('#btnDynamicConfirmOK').on('click', function () {
            $("#divDynamicConfirm").modal('hide');
            setTimeout(function () {
                if (callback_ok != null) callback_ok();
                $('#divDynamicConfirm').remove();
            }, 500)
        })
    },

    //resolve error
    resolveError: function (error, message) {
        var self = this;
        switch (error) {
            case 'login':
                $.snackbar({ content: 'Your login has been expired', timeout: 5000 });
                obs.trigger('showlogin', function () {
                    self.alert('Login successful! Please try your action again');
                });
                break;
            default:
                self.alert(message);
                break;
        }
    },

    //simplejax
    riotSimpleAjax: function (urlString, dataString, callback, showloading, reqLogin) {

        var self = this;

        if (reqLogin == null) reqLogin = true;
        if (showloading == null) showloading = true;

        //do ajax
        var doAjax = function () {
            //if need to show spiner
            if (showloading) {
                //create the loading form
                var div = '<div class="divWaiting" style="display:block;" id="RiotSpiner"><div class="loader"><div class="load8">Loading...</div></div></div>';
                //append to body
                $('body').append(div);
            };

            //send data
            setTimeout(function (param) {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: urlString,
                    contentType: 'application/json; charset=utf-8',
                    data: dataString,
                    success: function (res) {
                        //remove the showloading
                        if (showloading) { $('#RiotSpiner').remove(); }
                        //callback
                        callback(res);
                    },
                    error: function (response) {
                        //log the errors
                        console.log(response);
                        console.log(urlString);
                        return false;
                    },
                });
            }, 100);
        }

        //if require login then check session by checkLogin
        if (reqLogin) {
            self.checkLogin(doAjax, true);
        }
        else {
            doAjax();
        }
    },

    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + '; ' + expires;
    },

    getCookie: function (cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },

    formatNumber :  function(val, n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return val.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    }
};

riot.mixin(globalMixins);
