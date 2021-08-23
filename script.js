"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var SERVER_URL = 'https://academy.directlinedev.com';
renderMenu(); //button to top pages

(function () {
  var buttonUp = document.querySelector('.to-up-btn_js');
  if (!buttonUp) return;
  buttonUp.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 1500) {
      buttonUp.classList.remove('hidden');
    }

    if (window.pageYOffset < 1500) {
      buttonUp.classList.add('hidden');
    }
  });
})(); //Main slider


(function () {
  var slider = document.querySelector('.main-slider_js');

  if (!slider) {
    return;
  }

  var sliderWrapper = slider.querySelector('.slider-wrapper_js');
  var sliderInnerWrapper = sliderWrapper.querySelector('.slider-inner-wrapper_js');

  var slides = _toConsumableArray(sliderInnerWrapper.querySelectorAll('.slider-slide_js'));

  var btnPrev = slider.querySelector('.slider-btn-prev_js');
  var btnNext = slider.querySelector('.slider-btn-next_js');
  var pagination = slider.querySelector('.slider-pagination_js');
  var slidesCount = slides.length;
  var animationDuration = 500;
  var slideStorage = 0;

  if (!localStorage.getItem('activeSlide')) {
    slideStorage = 0;
  } else {
    slideStorage = +localStorage.getItem('activeSlide');
  }

  var id = null;
  var dots = [];
  var sliderWidth = 0;
  var activeSlide = 0;
  createDots();
  sliderInitWidth();
  setActiveSlide(slideStorage);
  window.addEventListener('resize', function () {
    sliderInitWidth();
    setActiveSlide(activeSlide);
  });
  btnPrev.addEventListener('click', function () {
    setActiveSlide(activeSlide - 1);
  });
  btnNext.addEventListener('click', function () {
    setActiveSlide(activeSlide + 1);
  });

  function createDots() {
    for (var i = 0; i < slidesCount; i++) {
      var li = document.createElement('li');
      var dot = createDot(i);
      dots.push(dot);
      li.appendChild(dot);
      pagination.insertAdjacentElement('beforeend', li);
    }
  }

  function createDot(index) {
    var dot = document.createElement('button');

    if (index === activeSlide) {
      dot.classList.add('main-slider__pagination_active');
    }

    dot.addEventListener('click', function () {
      setActiveSlide(index);
    });
    return dot;
  }

  function sliderInitWidth() {
    sliderWidth = sliderWrapper.offsetWidth;
    slides.forEach(function (slide) {
      slide.style.width = sliderWidth + 'px';
    });
  }

  function setActiveSlide(index) {
    var withAnimation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (index < 0 || index >= slides.length) {
      return;
    }

    if (withAnimation) {
      clearTimeout(id);
      sliderInnerWrapper.style.transition = "transform ".concat(animationDuration, "ms");
      id = setTimeout(function () {
        sliderInnerWrapper.style.transition = '';
      }, animationDuration);
    }

    if (index === 0) {
      btnPrev.disabled = true;
    } else {
      btnPrev.disabled = false;
    }

    if (index === slides.length - 1) {
      btnNext.disabled = true;
    } else {
      btnNext.disabled = false;
    }

    sliderInnerWrapper.style.transform = "translateX(-".concat(sliderWidth * index, "px)");
    dots[activeSlide].classList.remove('main-slider__pagination_active');
    dots[index].classList.add('main-slider__pagination_active');
    localStorage.setItem('activeSlide', index);
    activeSlide = index;
  }
})(); // Slider swiper


(function () {
  if (!document.querySelector('.swiper-container')) {
    return;
  }

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    navigation: {
      nextEl: '.swiper-btn-next_js',
      prevEl: '.swiper-btn-prev_js'
    }
  });
})(); //Open-Close modal window


(function () {
  modalControl('.sign-in-btn_js', '.sing-in-modal_js');
  modalControl('.message-btn_js', '.message-modal_js');
  modalControl('.register-btn_js', '.sing-up-modal_js');
})(); //mobile menu


(function () {
  var openMobileMenuBtn = document.querySelector('.mobile-menu-btn_js');

  if (!openMobileMenuBtn) {
    return;
  }

  var closeMobileMenuBtn = document.querySelector('.mobile-menu-close_js');
  var mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper_js');
  var mobileMenu = document.querySelector('.mobile-menu_js');
  modalControl('.sign-in-moble-btn_js', '.sing-in-modal_js');
  modalControl('.register-moble-btn_js', '.sing-up-modal_js');
  openMobileMenuBtn.addEventListener('click', function () {
    mobileMenuWrapper.classList.remove('mobile-menu-hidden');
    mobileMenu.classList.remove('mobile-menu-hidden');
  });
  closeMobileMenuBtn.addEventListener('click', function () {
    mobileMenuWrapper.classList.add('mobile-menu-hidden');
    mobileMenu.classList.add('mobile-menu-hidden');
  });
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      mobileMenuWrapper.classList.add('mobile-menu-hidden');
      mobileMenu.classList.add('mobile-menu-hidden');
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    window.onresize = function () {
      if (window.outerWidth > 486) {
        mobileMenuWrapper.classList.add('mobile-menu-hidden');
        mobileMenu.classList.add('mobile-menu-hidden');
      }
    };
  });
})(); //Validate form singin --------------------------------------------------------------------------------------------------------------------------------------------------------------


(function () {
  var formSignIn = document.forms.signInform;
  var singInModal = document.querySelector('.sing-in-modal_js');

  if (!formSignIn) {
    return;
  }

  var email = formSignIn.elements.email;
  var password = formSignIn.elements.password;
  var submitBtn = formSignIn.querySelector('.sing-in-btn_js');
  formSignIn.addEventListener('submit', function (event) {
    event.preventDefault();
    var valideMessage = [];
    valideMessage = errorChecker(email.value, password.value);

    if (Object.keys(valideMessage[0]).length) {
      setBtnError(submitBtn);
      Object.keys(valideMessage[0]).forEach(function (key) {
        var textError = valideMessage[0][key];
        var input = formSignIn.elements[key];
        setError(input, textError);
      });
    } else {
      setBtnValid(submitBtn);
    }

    if (Object.keys(valideMessage[1]).length) {
      Object.keys(valideMessage[1]).forEach(function (key) {
        var textError = valideMessage[1][key];
        var input = formSignIn.elements[key];
        setNoError(input, textError);
      });
    }

    if (!Object.keys(valideMessage[0]).length) {
      var data = {
        email: email.value,
        password: password.value
      };
      controlSpinner(singInModal);
      sendrequest({
        method: 'POST',
        url: '/api/users/login',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        controlSpinner(singInModal, false);

        if (res.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          event.target.reset();
          clearMessage(singInModal);
          visualMessageSendForm(true, singInModal);
          renderMenu();
          location.pathname = '/pages/profile';
        } else {
          throw res;
        }
      }).catch(function (err) {
        controlSpinner(singInModal, false);
        event.target.reset();
        clearMessage(singInModal);
        visualMessageSendForm(false, singInModal);
        alert(err._message);
      });
    }
  });
})(); //End Validate form singin --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Validate form register --------------------------------------------------------------------------------------------------------------------------------------------------------------


(function () {
  var registerForm = document.forms.registerForm;
  var modalWindow = document.querySelector('.sing-up-modal_js');

  if (!registerForm) {
    return;
  }

  var email = registerForm.elements.email;
  var password = registerForm.elements.password;
  var repeatPassword = registerForm.elements.repeatPassword;
  var name = registerForm.elements.name;
  var sname = registerForm.elements.sname;
  var location = registerForm.elements.location;
  var age = registerForm.elements.age;
  var agreement = registerForm.elements.agreement;
  var btnSubmit = registerForm.querySelector('.sing-up-btn_js');
  disableButtonAgree(btnSubmit, agreement);
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var valideMessage = [];
    valideMessage = errorChecker(email.value, password.value, undefined, name.value, sname.value, age.value, location.value, repeatPassword.value);

    if (Object.keys(valideMessage[0]).length) {
      setBtnError(btnSubmit);
      Object.keys(valideMessage[0]).forEach(function (key) {
        var textError = valideMessage[0][key];
        var input = registerForm.elements[key];
        setError(input, textError, password, registerForm);
      });
    } else {
      setBtnValid(btnSubmit);
    }

    if (Object.keys(valideMessage[1]).length) {
      Object.keys(valideMessage[1]).forEach(function (key) {
        var textError = valideMessage[1][key];
        var input = registerForm.elements[key];
        setNoError(input, textError);
      });
    }

    if (!Object.keys(valideMessage[0]).length) {
      var data = {
        email: email.value,
        password: password.value,
        age: +age.value,
        name: name.value,
        surname: sname.value,
        location: location.value
      };
      controlSpinner(modalWindow);
      sendrequest({
        method: 'POST',
        url: '/api/users',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        controlSpinner(modalWindow, false);

        if (res.success) {
          event.target.reset();
          clearMessage(modalWindow, true);
          visualMessageSendForm(true, modalWindow);
        } else {
          throw res;
        }
      }).catch(function (err) {
        controlSpinner(modalWindow, false);
        event.target.reset();
        clearMessage(modalWindow, true);
        visualMessageSendForm(false, modalWindow);
        alert(JSON.stringify(err.errors));
      });
    }
  });
})(); //End Validate form register --------------------------------------------------------------------------------------------------------------------------------------------------------------


function clearMessage(messageForm) {
  var disabledBtn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var msgError = messageForm.querySelectorAll('.message-error');
  var msgNoError = messageForm.querySelectorAll('.message-noError');
  var inputNoError = messageForm.querySelectorAll('.no-error');
  var inputError = messageForm.querySelectorAll('.error');
  var btnMsgValid = messageForm.querySelector('.btn-valid');
  var btnMsgError = messageForm.querySelector('.btn-error');

  if (btnMsgValid) {
    btnMsgValid.classList.remove('btn-valid');

    if (disabledBtn) {
      btnMsgValid.disabled = true;
    }
  }

  if (btnMsgError) {
    btnMsgError.classList.remove('btn-error');

    if (disabledBtn) {
      btnMsgValid.disabled = true;
    }
  }

  if (msgError.length) {
    msgError.forEach(function (msg) {
      msg.remove();
    });
  }

  if (msgNoError.length) {
    msgNoError.forEach(function (msg) {
      msg.remove();
    });
  }

  if (inputNoError.length) {
    inputNoError.forEach(function (msg) {
      msg.classList.remove('no-error');
    });
  }

  if (inputError.length) {
    inputError.forEach(function (msg) {
      msg.classList.remove('error');
    });
  }
} //Validate form message --------------------------------------------------------------------------------------------------------------------------------------------------------------


(function () {
  var messageForm = document.forms.messageForm;
  var messageModal = document.querySelector('.message-modal_js');

  if (!messageForm) {
    return;
  }

  var email = messageForm.elements.email;
  var subject = messageForm.elements.subject;
  var name = messageForm.elements.name;
  var phone = messageForm.elements.phone;
  var message = messageForm.elements.message;
  var agreement = messageForm.elements.agreement;
  var btnSubmit = messageForm.querySelector('.message-btn_js');
  disableButtonAgree(btnSubmit, agreement);
  messageForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var valideMessage = [];
    valideMessage = errorChecker(email.value, undefined, phone.value, name.value, undefined, undefined, undefined, undefined, subject.value);

    if (Object.keys(valideMessage[0]).length) {
      setBtnError(btnSubmit);
      Object.keys(valideMessage[0]).forEach(function (key) {
        var textError = valideMessage[0][key];
        var input = messageForm.elements[key];
        setError(input, textError);
      });
    } else {
      setBtnValid(btnSubmit);
    }

    if (Object.keys(valideMessage[1]).length) {
      Object.keys(valideMessage[1]).forEach(function (key) {
        var textError = valideMessage[1][key];
        var input = messageForm.elements[key];
        setNoError(input, textError);
      });
    }

    if (!Object.keys(valideMessage[0]).length) {
      var bodyjson = JSON.stringify({
        email: email.value,
        phone: phone.value,
        name: name.value,
        message: message.value
      });
      var data = {
        to: subject.value,
        body: bodyjson
      };
      controlSpinner(messageModal);
      sendrequest({
        method: 'POST',
        url: '/api/emails',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        controlSpinner(messageModal, false);

        if (res.success) {
          event.target.reset();
          clearMessage(messageModal, true);
          visualMessageSendForm(true, messageModal);
        } else {
          throw res;
        }
      }).catch(function (err) {
        controlSpinner(messageModal, false);
        event.target.reset();
        clearMessage(messageModal, true);
        visualMessageSendForm(false, messageModal);
        alert(err._message);
      });
    }
  });
})(); //End Validate form message --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Добавление и удаление ошибок в форме


function setError(input, errorMessage, password, form) {
  var error = errorCreator(errorMessage);
  var customInput = input;

  if (!customInput.classList.contains('input-invalide') && !customInput.classList.contains('error')) {
    customInput.classList.add('input-invalide');
    customInput.classList.add('error');
    customInput.insertAdjacentElement('afterend', error);
  }

  customInput.addEventListener('input', function () {
    //Если пишем в поле repeatPassword то удаляем ошибку у поля password тоже
    if (customInput.name === "repeatPassword") {
      var errorPasswordMessage = form.querySelector('input[name="password"]~.message-error');

      if (errorPasswordMessage) {
        errorPasswordMessage.remove();
        password.classList.remove('input-invalide');
        password.classList.remove('error');
      }
    }

    if (customInput.name === "repeatNewPassword") {
      var _errorPasswordMessage = form.querySelector('input[name="newPassword"]~.message-error');

      if (_errorPasswordMessage) {
        _errorPasswordMessage.remove();

        password.classList.remove('input-invalide');
        password.classList.remove('error');
      }
    }

    error.remove();
    customInput.classList.remove('input-invalide');
    customInput.classList.remove('error');
  }, {
    once: true
  });
}

function setNoError(input, message) {
  var noError = noErrorElementCreator(message);

  if (!input.classList.contains('input-valide') && !input.classList.contains('no-error')) {
    input.classList.add('input-valide');
    input.classList.add('no-error');
    input.insertAdjacentElement('afterend', noError);
  }

  input.addEventListener('input', function () {
    noError.remove();
    input.classList.remove('input-valide');
    input.classList.remove('no-error');
  }, {
    once: true
  });
} //Checking data for errors


function errorChecker(email, password, phone, name, sname, age, location, repeatPassword, subject, newPassword, repeatNewPassword) {
  var error = {};
  var noError = {};

  if (email != undefined) {
    if (email.trim().length === 0) {
      error.email = 'This field is required';
    } else if (!emailCheck(email)) {
      error.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    } else {
      noError.email = 'All right';
    }
  }

  if (subject != undefined) {
    if (subject.trim().length === 0) {
      error.subject = 'This field is required';
    } else if (!emailCheck(subject)) {
      error.subject = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    } else {
      noError.subject = 'All right';
    }
  }

  if (password != undefined) {
    if (password.trim().length === 0) {
      error.password = 'This field is required';
    } else if (password.trim().length < 6) {
      error.password = 'The password must be longer than 6 characters!';
    } else if (repeatPassword != undefined) {
      if (repeatPassword.trim().length === 0) {
        error.repeatPassword = 'This field is required';
      } else if (!(repeatPassword === password)) {
        error.password = 'Passwords must match!';
        error.repeatPassword = 'Passwords must match!';
      } else {
        noError.repeatPassword = 'All right';
        noError.password = 'All right';
      }
    } else {
      noError.password = 'All right';
    }
  }

  if (newPassword != undefined) {
    if (newPassword.trim().length === 0) {
      error.newPassword = 'This field is required';
    } else if (newPassword.trim().length < 6) {
      error.newPassword = 'The password must be longer than 6 characters!';
    } else if (repeatNewPassword != undefined) {
      if (repeatNewPassword.trim().length === 0) {
        error.repeatNewPassword = 'This field is required';
      } else if (!(repeatNewPassword === newPassword)) {
        error.newPassword = 'Passwords must match!';
        error.repeatNewPassword = 'Passwords must match!';
      } else {
        noError.repeatNewPassword = 'All right';
        noError.newPassword = 'All right';
      }
    }
  }

  if (phone != undefined) {
    if (phone.trim().length === 0) {
      error.phone = 'This field is required';
    } else if (!phoneCheck(phone)) {
      error.phone = 'Please enter a valid phone (your entry is not in the format "+79999999999")';
    } else {
      noError.phone = 'All right';
    }
  }

  if (name != undefined) {
    if (name.trim().length === 0) {
      error.name = 'This field is required';
    } else {
      noError.name = 'All right';
    }
  }

  if (sname != undefined) {
    if (sname.trim().length === 0) {
      error.sname = 'This field is required';
    } else {
      noError.sname = 'All right';
    }
  }

  if (age != undefined) {
    if (age.trim().length === 0) {
      error.age = 'This field is required';
    } else if (+age < 18) {
      error.age = 'The age must be over 18 years old';
    } else {
      noError.age = 'All right';
    }
  }

  if (location != undefined) {
    if (location.trim().length === 0) {
      error.location = 'This field is required';
    } else {
      noError.location = 'All right';
    }
  }

  return [error, noError];
} //Создание эллемента с текстом ошибки или с текстом отсутствия ошибки


function errorCreator(message) {
  var messageError = document.createElement('div');
  messageError.classList.add('message-error');
  messageError.innerText = message;
  return messageError;
}

function noErrorElementCreator(message) {
  var messageError = document.createElement('div');
  messageError.classList.add('message-noError');
  messageError.innerText = message;
  return messageError;
} //выставление и удаление классов кнопке отправки формы, при наличии и отсутствии ошибок


function setBtnValid(button) {
  button.classList.remove('btn-error');
  button.classList.add('btn-valid');
}

function setBtnError(button) {
  button.classList.remove('btn-valid');
  button.classList.add('btn-error');
} // Lock && Unlock button submit


function disableButtonAgree(button, checkbox) {
  button.disabled = true;
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });
}

function emailCheck(email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function phoneCheck(phone) {
  return phone.match(/^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
} //Управление модальными окнами


function modalControl(classBtnOpen, classModal) {
  if (!document.querySelector(classModal)) {
    return;
  }

  var modalWindow = document.querySelector(classModal);
  var modalOverlay = document.querySelector('.modal-overlay_js');
  var btnOpen = document.querySelector(classBtnOpen);
  var btnClose = modalWindow.querySelector(".modal-btn-close_js");

  if (modalWindow || btnClose || btnOpen) {
    btnOpen.addEventListener('click', function () {
      modalWindow.classList.remove('hidden');
      modalOverlay.classList.remove('hidden');
    });
    btnClose.addEventListener('click', function () {
      modalWindow.classList.add('hidden');
      modalOverlay.classList.add('hidden');
    });
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        modalWindow.classList.add('hidden');
        modalOverlay.classList.add('hidden');
      }
    });
  }
}

function controlSpinner(classForm) {
  var onOff = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var spinner = classForm.querySelector('.spinner_js');
  if (!spinner) return;

  if (onOff) {
    spinner.classList.remove('hidden');
  } else {
    spinner.classList.add('hidden');
  }
}

function visualMessageSendForm(successOrError) {
  var form = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (form) {
    form.classList.add('hidden');
  }

  var errorMessage = document.querySelector('.wrapper-error_js');
  var overlay = document.querySelector('.modal-overlay_js');

  if (!errorMessage || !overlay) {
    return;
  }

  var errorMessageBtn = errorMessage.querySelector('.close-error-btn_js');
  var successMessage = document.querySelector('.wrapper-success_js');
  var successMessageBtn = successMessage.querySelector('.close-success-btn_js');

  if (successOrError) {
    successMessage.classList.remove('hidden');
    overlay.classList.remove('hidden');
    successMessageBtn.addEventListener('click', function () {
      successMessage.classList.add('hidden');
      overlay.classList.add('hidden');
    }, {
      once: true
    });
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        successMessage.classList.add('hidden');
        overlay.classList.add('hidden');
      }
    });
    setTimeout(function () {
      successMessage.classList.add('hidden');
      overlay.classList.add('hidden');
    }, 2000);
  }

  if (!successOrError) {
    errorMessage.classList.remove('hidden');
    overlay.classList.remove('hidden');
    errorMessageBtn.addEventListener('click', function () {
      errorMessage.classList.add('hidden');
      overlay.classList.add('hidden');
    }, {
      once: true
    });
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        errorMessage.classList.add('hidden');
        overlay.classList.add('hidden');
      }
    });
    setTimeout(function () {
      errorMessage.classList.add('hidden');
      overlay.classList.add('hidden');
    }, 2000);
  }
}

function sendrequest(_ref) {
  var url = _ref.url,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'GET' : _ref$method,
      headers = _ref.headers,
      _ref$body = _ref.body,
      body = _ref$body === void 0 ? null : _ref$body;
  return fetch(SERVER_URL + url + '?v=1.0.0', {
    method: method,
    headers: headers,
    body: body
  });
}

function renderMenu() {
  var noLoginLinks = document.querySelectorAll('.nav-no-login_js');
  var loginLinks = document.querySelectorAll('.nav-login_js');
  var isLogin = localStorage.getItem('token');

  if (!noLoginLinks || !loginLinks) {
    return;
  }

  if (isLogin) {
    loginLinks.forEach(function (link) {
      link.classList.remove('hidden');
    });
    noLoginLinks.forEach(function (link) {
      link.classList.add('hidden');
    });
  } else {
    loginLinks.forEach(function (link) {
      link.classList.add('hidden');
    });
    noLoginLinks.forEach(function (link) {
      link.classList.remove('hidden');
    });
  }
}