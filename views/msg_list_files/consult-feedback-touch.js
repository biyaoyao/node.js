 var number = 0;
 var myScroll,
     pullDownEl, pullDownOffset,
     pullUpEl, pullUpOffset,
     generatedCount = 0;

 function pullDownAction() {
     // <-- Simulate network congestion, remove setTimeout from production!
     $('#thelist').empty();
     $('#total_unread').empty();
     $('#pullUp').hide();
     methods.data.total_unread = 0;
     methods.data.page = 1;
     methods.getConsultDoctorsList();
     // Remember to refresh when contents are loaded (ie: on ajax completion)
     // <-- Simulate network congestion, remove setTimeout from production!
 }

 function pullUpAction() {
     setTimeout(function() { // <-- Simulate network congestion, remove setTimeout from production!
         methods.data.page++;
         methods.getConsultDoctorsList();


         // Remember to refresh when contents are loaded (ie: on ajax completion)
     }, 0); // <-- Simulate network congestion, remove setTimeout from production!
 }

 function loaded() {
     pullDownEl = document.getElementById('pullDown');
     pullDownOffset = pullDownEl.offsetHeight;
     pullUpEl = document.getElementById('pullUp');
     pullUpOffset = pullUpEl.offsetHeight;

     myScroll = new iScroll('wrapper', {
         useTransition: true,
         topOffset: pullDownOffset,
         onRefresh: function() {
             if (pullDownEl.className.match('loading')) {
                 pullDownEl.className = '';
                 pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新页面';
             } else if (pullUpEl.className.match('loading')) {
                 pullUpEl.className = '';
                 pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
             }
         },
         onScrollMove: function() {
             if (this.y > 5 && !pullDownEl.className.match('flip')) {
                 pullDownEl.className = 'flip';
                 pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放更新';
                 this.minScrollY = 0;
             } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                 pullDownEl.className = '';
                 pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新页面';
                 this.minScrollY = -pullDownOffset;
             } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                 pullUpEl.className = 'flip';
                 pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放更新';
                 this.maxScrollY = this.maxScrollY;
             } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                 pullUpEl.className = '';
                 pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多';
                 this.maxScrollY = pullUpOffset;
             }
         },
         onScrollEnd: function() {
             if (pullDownEl.className.match('flip')) {
                 pullDownEl.className = 'loading';
                 pullDownEl.querySelector('.pullDownLabel').innerHTML = '更新中...';
                 pullDownAction(); // Execute custom function (ajax call?)
             } else if (pullUpEl.className.match('flip')) {
                 pullUpEl.className = 'loading';
                 pullUpEl.querySelector('.pullUpLabel').innerHTML = '数据加载中...';
                 pullUpAction(); // Execute custom function (ajax call?)
             }
         }
     });

     setTimeout(function() {
         document.getElementById('wrapper').style.left = '0';
     }, 800);
 }

 document.addEventListener('touchmove', function(e) {
     e.preventDefault();
 }, false);

 document.addEventListener('DOMContentLoaded', function() {
     setTimeout(loaded, 200);
 }, false);

 function bottom() {
     var e = document.getElementById("thelist")
     e.scrollTop = e.scrollHeight;
     var getElm = document.getElementById("thelist").getElementsByTagName("li");
     getElm[getElm.length - 1].scrollIntoView();

 }