window.formUtils = (function($) {

   var formValidator = function() {
     this.name = 'formValidator';
   };

   formValidator.prototype.hellotest = function() {
     console.log('hello there!');
   }

   formValidator.prototype.isValidName = function(str) {
     var def = new RegExp(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\u2018\u0027\s]*)$/g);
     var result = def.test(str);
     return result;
   }

   /**
    * @param cellphone: Must be a String
    */
   formValidator.prototype.isValidUruguaianCellPhone = function(cellphone) {
     if (cellphone.length != 9) { return false; }
     if (cellphone.substring(0,2) != '09') { return false; }
     if (/^\d+$/.test(cellphone) == false) { return false; }
     return true;
   }

   /**
    * @param linephone: Must be a String
    */
   formValidator.prototype.isValidLinePhone = function(linephone) {
     if (/^\d+$/.test(linephone) == false) { return false; }
     return true;
   }

   /**
    * @param linephone: Must be a String
    */
   formValidator.prototype.isValidUruguaianLinePhone = function(linephone) {
     if (!this.isValidLinePhone(linephone)) {  return false; }
     if (linephone.length != 8) {  return false; }
     if ((linephone.substring(0,1) != '2') && (linephone.substring(0,1) != '4')) { return false; }
     return true;
   }

   /**
    * @param pwd: Must be a String
    */
   formValidator.prototype.isValidPassword = function(pwd) {
     var def = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
     var result = def.test(pwd);
     return result;
   }

   /**
    * Returns true or false if includesVerifierDigit is passed in as true, otherwise returns the value  verifier digit should be
    * @param ci: Must be a String, must have 7 or 8 characters
    * @param includesVerifierDigit: Should be boolean
    */
   formValidator.prototype.validateCI = function(ci, includesVerifierDigit) {
     var ci, verifierDigit, trueVerifierDigit;
     var total = 0;
     var numberContainer = [];
     var multiplierContainer = [2, 9, 8, 7, 6, 3, 4];
     ci = ci.toString();
     if (includesVerifierDigit) {
       verifierDigit = ci.substring(ci.length - 1, ci.length);
       ci = ci.slice(0, -1);
     }
     for (var idx = ci.length; idx < 7; idx++) {
       numberContainer.push(0);
     }
     for (var jdx = 0; jdx < ci.length; jdx++) {
       numberContainer.push(parseInt(ci[jdx]));
     }
     for (var kdx = 0; kdx < 7; kdx++) {
       total += numberContainer[kdx] * multiplierContainer[kdx];
     }
     trueVerifierDigit = Math.ceil(total/10)*10 - total;
     if (includesVerifierDigit) {
       return trueVerifierDigit === parseInt(verifierDigit)
     } else {
       return trueVerifierDigit
     }
   }

   formValidator.prototype.isEmptyInput = function($elem) {
     var hasValue;
     if ($elem.is('select')) {
       var optionSelected = $elem.find('option:selected').val();
       hasValue = optionSelected == '';
     } else {
       hasValue = ($elem.val() == '');
     }
     return hasValue;
   }


   formValidator.prototype.isValidMail = function(mail) {
     if (mail.indexOf('@') > 1 && mail.indexOf('@') < mail.length && mail.indexOf('.') > 0 && mail.indexOf('.') < mail.length) {
       return true
     } else {
       return false
     }
   };

   /**
    * @param date: Must be a String, format dmYYYY
    */
   formValidator.prototype.isValidDate = function(date) {
     var regexp = new RegExp(/(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d/);
     return regexp.test(date);
   };

   /**
    * @param date: Must be a String, format dmYYYY
    * @param years: integer
    */
   formValidator.prototype.isValidBirthdate = function(date, years) {
     var day = date.substring(0, 2);
     var month = date.substring(3, 5);
     var year = date.substring(6, 10);
     var birthDate = new Date(year, month - 1, day);
     var today = new Date();
     today.setFullYear(today.getFullYear() - years);
     var timeDiff = today.getTime() - birthDate.getTime();
     var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
     if (diffDays < 0) {
       return false
     } else {
       return true
     }
   }

   formValidator.prototype.doesPasswordsMatch = function(pwd1, pwd2) {
     return (pwd1 === pwd2)
   }

   return {
     formValidator: formValidator
   }

})(jQuery);
