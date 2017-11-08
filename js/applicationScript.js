/*
 * Copyright (c) 2015 Advanced Community Information Systems (ACIS) Group, Chair
 * of Computer Science 5 (Databases & Information Systems), RWTH Aachen
 * University, Germany All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 * 
 * Neither the name of the ACIS Group nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var client;

var init = function() {
  window.currentQuestionId = 1;
  var iwcCallback = function(intent) {
    // define your reactions on incoming iwc events here 
    console.log(intent);

  };

  client = new Las2peerWidgetLibrary("http://cloud10.dbis.rwth-aachen.de:8086/videoquiz/", iwcCallback);

  $('#continueButton').on('click', function() {
    //start parameter initiation

    //end parameter initiation
    onContinueClicked();
  })


}

// onContinueClicked
var onContinueClicked = function(){

//start variable declaration

//end variable declaration
    window.currentQuestionId += 1;
  client.sendRequest("GET", "videoquiz/getQuiz/"+window.currentQuestionId, "", "", {}, false,
  function(data, type) {
    if(Object.keys(data).length > 0){
	    $('#answerOption1').parent().contents().last()[0].textContent=data.answerA;
	    $('#answerOption2').parent().contents().last()[0].textContent=data.answerB;
	    $('#answerOption3').parent().contents().last()[0].textContent=data.answerC;
	    $('#answerOption4').parent().contents().last()[0].textContent=data.answerD;
	    $('#youtubeFrame').attr('src',data.videolink);
    	$("#questionText").text(data.question);
    }else{
       $("#questionText").text("Quiz completed thank you!");
       $('label').hide();
       $('button').hide();
   }  
   
  },
  function(error) {
    console.log(error);
  });

  //Additional own javascript

}


$(document).ready(function() {
  init();
});
