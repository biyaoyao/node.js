var URL = {
    post_url: '/consult/getConsultDoctorsList.action'
};
var methods = {
    data: {
        user_id: getPara("user_id"),
        wxid: getPara("wxid"),
        page: 1,
        total_unread: 0,
        para: new Date().getTime()
    },
    Element: {
        a: '<li onclick="doChat(',
        a1: '<table onclick="doChat(',
        b: ')"><table><tbody><tr><td class="doctor-photourl"><img src="',
        b1: ')"><tbody><tr><td class="doctor-photourl"><img src="',
        c: '"></td><td class="doctor-name-text"><ul style="list-style:none"><li class="doctor-name">',
        d: '</li><li class="doctor-text">',
        e: '</li></ul></td><td class="doctor-time">',
        f: '</td></tr></tbody></table></li>'
    },
    bind: function() {
        _this = this;
    },
    getConsultDoctorsList: function() {
        var data = _this.data;
        $.post(URL.post_url, data, function(res) {
            if (res.result) {
                var consult_doctor_list = res.consult_doctor_list;
                if (consult_doctor_list.length == 10) {
                    $('#pullUp').show();
                } else {
                    $('#pullUp').hide();
                }
                if (_this.data.page == 1 && consult_doctor_list.length == 0) {
                    $('#noConsult').show();

                }
                var getElm = document.getElementById("thelist").getElementsByTagName("li");

                for (var i = 0; i < consult_doctor_list.length; i++) {
                    var unread = "";
                    _this.data.total_unread = _this.data.total_unread + parseInt(consult_doctor_list[i].unread);
                    if (consult_doctor_list[i].unread > 0 && consult_doctor_list[i].unread <= 99) {
                        unread = '<span class="unread-number">' + consult_doctor_list[i].unread + '</span>';
                    } else if (consult_doctor_list[i].unread > 99) {
                        unread = '<span class="unread-number">99+</span>';
                    }
                    var description = consult_doctor_list[i].description;
                    if (description.length > 15) {
                        description = description.substring(0, 12) + "...";
                    }
                    _this.assemBly.a = _this.Element.a + consult_doctor_list[i].doctor_id;
                    _this.assemBly.b = _this.Element.b + consult_doctor_list[i].doctor_photourl;
                    _this.assemBly.a1 = _this.Element.a1 + consult_doctor_list[i].doctor_id;
                    _this.assemBly.b1 = _this.Element.b1 + consult_doctor_list[i].doctor_photourl;
                    _this.assemBly.c = _this.Element.c + unread + consult_doctor_list[i].doctor_name;
                    _this.assemBly.d = _this.Element.d + description;
                    _this.assemBly.e = _this.Element.e + _this.getTime(consult_doctor_list[i].date);
                    _this.assemBly.f = _this.Element.f;

                    _this.assemBly.f = _this.Element.f;
                    if (_this.data.page == 1) {
                        $('#thelist').append(_this.comBine());
                        if (i == consult_doctor_list.length - 1) {

                            if (_this.data.total_unread > 0) {
                                $('#total_unread').html("(" + _this.data.total_unread + ")");
                            }
                            myScroll.refresh();
                        }
                    } else {
                        var el, li, i;
                        el = document.getElementById('thelist');
                        li = document.createElement('li');
                        li.innerHTML = _this.comBine1();
                        el.appendChild(li, el.childNodes[0]);
                        myScroll.refresh(); // Remember to refresh when contents are loaded (ie: on ajax completion)

                    }
                }
            } else {

            }

        }, "json");
    },
    assemBly: {
        a: '',
        a1: '',
        b: '',
        b1: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: ''
    },
    comBine: function() {
        return _this.assemBly.a + _this.assemBly.b + _this.assemBly.c + _this.assemBly.d + _this.assemBly.e + _this.assemBly.f + _this.assemBly.g;
    },
    comBine1: function() {
        return _this.assemBly.a1 + _this.assemBly.b1 + _this.assemBly.c + _this.assemBly.d + _this.assemBly.e + _this.assemBly.f + _this.assemBly.g;
    },
    getTime: function(Time) {
        var myDate = new Date();
        var time = "";
        var time0 = "";
        var time1 = "";
        var time2 = "";
        var time3 = "";
        var s = Time;
        var k = s.split(' ');

        var k1 = k[1].split(':');

        //                          alert(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟");
        /*相差年数*/
        var months = new Date().getMonth() + 1 - Time.substring(5, 7);
        var days = new Date().getDate() - Time.substring(8, 10);

        if (myDate.getFullYear() == s.substring(0, 4)) {
            time0 = "";
            //判断月份
            if (months == 0) {
                /*判断相差天数*/
                if (days == 0) {
                    time1 = "";
                    /*早上 中午 晚上*/
                    if (k1[0] >= 0 && k1[0] < 6) {
                        time2 = "凌晨";
                    } else if (k1[0] >= 6 && k1[0] < 8) {
                        time2 = "早上";
                    } else if (k1[0] >= 8 && k1[0] < 11) {
                        time2 = "上午";
                    } else if (k1[0] >= 11 && k1[0] < 13) {
                        time2 = "中午";
                    } else if (k1[0] >= 13 && k1[0] < 18) {
                        time2 = "下午";
                    } else if (k1[0] >= 18 && k1[0] < 24) {
                        time2 = "晚上";
                    }
                    time3 = s.substring(10, 16);
                } else if (days == 1) {
                    time1 = "昨天";
                } else if (days == 2) {
                    time1 = "前天";
                } else {
                    time1 = s.substring(5, 7) + "月" + s.substring(8, 10) + "日";
                }
            } else {
                time1 = s.substring(5, 7) + "月" + s.substring(8, 10) + "日";

            }

        } else {
            time0 = s.substring(0, 4) + "年";
            time1 = s.substring(5, 7) + "月" + s.substring(8, 10) + "日";
        }





        return time0 + time1 + " " + time2 + time3;
    }

};
methods.bind();
methods.getConsultDoctorsList();

function consult() {
    window.location.href = "find_doctors.html?user_id=" + methods.data.user_id + "&wxid=" + methods.data.wxid + "&keshi_id=2&para=" + methods.data.para;
}

function doChat(doctor_id) {
    //                alert(doctor_id+user_id);
    var url = "http://2i.vt2020.com/consult/turn2ConsultChatPage.action?doctor_id=" + doctor_id + "&para=" + methods.data.para;
    window.location.href = encodeURI(url);

}