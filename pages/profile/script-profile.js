"use strict";

(function () {
  var profileContainer = document.querySelector('.profile_js');
  var spinner = document.querySelector('.profile-spinner_js');
  var editDataModal = document.querySelector('.edit-data-modal_js');
  var editPasswordModal = document.querySelector('.edit-password-modal_js');
  var modalOverlay = document.querySelector('.modal-overlay_js');
  var editPasswordForm = document.forms.editPasswordForm;
  var editDataForm = document.forms.editDataForm;
  var btnDeleteAccount = document.querySelector('.delete-user-btn_js');
  if (!profileContainer || !spinner || !editPasswordForm || !editDataForm || !editDataModal || !editPasswordModal) return;
  var profileImage = profileContainer.querySelector('.profile-image_js');
  var profileName = profileContainer.querySelector('.profile-name_js');
  var profileSname = profileContainer.querySelector('.profile-sname_js');
  var profileEmail = profileContainer.querySelector('.profile-email_js');
  var profileLocation = profileContainer.querySelector('.profile-location_js');
  var profileAge = profileContainer.querySelector('.profile-age_js');
  var profile = null;
  getUserProfile();
  profileModalOpen();
  validateEditProfile();
  btnDeleteAccount.addEventListener('click', deleteAccount);
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      renderMenu();
    }
  });

  function validateEditProfile() {
    var fileInputFake = editDataForm.querySelector('.fakeFile-input_js');
    var fileInput = editDataForm.elements.avatar;
    var btnSubmit = editDataForm.querySelector('.edit-data-btn_js');
    fileInput.addEventListener('click', function () {
      fileInput.value = null;
    });
    fileInput.addEventListener('change', function () {
      var strFileName = fileInput.value.split('\\');
      fileInputFake.innerText = strFileName[strFileName.length - 1];
    });
    editDataForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = editDataForm.elements.email;
      var name = editDataForm.elements.name;
      var location = editDataForm.elements.location;
      var age = editDataForm.elements.age;
      var surname = editDataForm.elements.surname;
      var textError = '';

      if (email.value.trim().length != 0) {
        if (!emailCheck(email.value)) {
          textError = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
          setError(email, textError, undefined, undefined);
          setBtnError(btnSubmit);
          return;
        } else {
          setNoError(email, 'All right');
          setBtnValid(btnSubmit);
        }
      } else {
        textError = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
        setError(email, textError, undefined, undefined);
        setBtnError(btnSubmit);
        return;
      }

      if (name.value.trim().length != 0) {
        setNoError(name, 'All right');
        setBtnValid(btnSubmit);
      } else {
        textError = 'This field is required';
        setError(name, textError, undefined, undefined);
        setBtnError(btnSubmit);
        return;
      }

      if (surname.value.trim().length != 0) {
        setNoError(surname, 'All right');
        setBtnValid(btnSubmit);
      } else {
        textError = 'This field is required';
        setError(surname, textError, undefined, undefined);
        setBtnError(btnSubmit);
        return;
      }

      if (age.value.trim().length === 0) {
        textError = 'This field is required';
        setError(age, textError, undefined, undefined);
        setBtnError(btnSubmit);
        return;
      } else if (+age.value < 18) {
        textError = 'The age must be over 18 years old';
        setError(age, textError, undefined, undefined);
        setBtnError(btnSubmit);
        return;
      } else {
        setNoError(age, 'All right');
        setBtnValid(btnSubmit);
      }

      if (location.value.trim().length != 0) {
        setNoError(location, 'All right');
        setBtnValid(btnSubmit);
      } else {
        textError = 'This field is required';
        setError(location, textError, undefined, undefined);
        setBtnError(btnSubmit);
        return;
      }

      var data = new FormData(editDataForm);
      controlSpinner(editDataModal);
      sendrequest({
        method: 'PUT',
        url: '/api/users/',
        body: data,
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      }).then(function (res) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          window.location.pathname = '/';
        }

        return res.json();
      }).then(function (res) {
        controlSpinner(editDataModal, false);

        if (res.success) {
          profile = res.data;
          renderProfile();
          clearMessage(editDataModal);
          visualMessageSendForm(true, editDataModal);
        } else {
          throw res;
        }
      }).catch(function (err) {
        console.log(err);
        controlSpinner(editDataModal, false);
        visualMessageSendForm(false, editDataModal);
      });
    });
  }

  function getUserProfile() {
    spinner.classList.remove('hidden');
    sendrequest({
      method: 'GET',
      url: '/api/users/' + localStorage.getItem('userId')
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      if (res.success) {
        profile = res.data;
        renderProfile();
      } else {
        window.location.pathname = '/';
      }
    }).finally(function () {
      spinner.classList.add('hidden');
    });
  }

  function renderProfile() {
    profileImage.src = SERVER_URL + profile.photoUrl;
    profileName.innerText = profile.name;
    profileSname.innerText = profile.surname;
    profileEmail.innerText = profile.email;
    profileLocation.innerText = profile.location;
    profileAge.innerText = profile.age;
  }

  function profileModalOpen() {
    var btnEditDataOpen = document.querySelector('.change-data-btn_js');
    var btnEditpasswordOpen = document.querySelector('.change-password-btn_js');

    if (!btnEditDataOpen || !btnEditpasswordOpen) {
      return;
    }

    btnEditDataOpen.addEventListener('click', function () {
      editDataForm.email.value = profile.email;
      editDataForm.surname.value = profile.surname;
      editDataForm.name.value = profile.name;
      editDataForm.location.value = profile.location;
      editDataForm.age.value = profile.age;
      profileModalControl(editDataModal);
    });
    btnEditpasswordOpen.addEventListener('click', function () {
      profileModalControl(editPasswordModal);
    });
  }

  function profileModalControl(modal) {
    var modalBtnClose = modal.querySelector('.modal-btn-close_js');
    modal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
    modalBtnClose.addEventListener('click', function () {
      modal.classList.add('hidden');
      modalOverlay.classList.add('hidden');
    });
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        modal.classList.add('hidden');
        modalOverlay.classList.add('hidden');
      }
    });
  }

  function deleteAccount() {
    sendrequest({
      method: 'DELETE',
      url: '/api/users/' + localStorage.getItem('userId'),
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then(function (res) {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.pathname = '/';
      }

      return res.json();
    }).then(function (res) {
      if (res.success) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.pathname = '/';
        visualMessageSendForm(true);
      } else {
        throw res;
      }
    }).catch(function (err) {
      console.log(err);
      visualMessageSendForm(false);
    });
  }
})(); //Validate form editpassword --------------------------------------------------------------------------------------------------------------------------------------------------------------


(function () {
  var editPasswordForm = document.forms.editPasswordForm;
  var editPasswordModal = document.querySelector('.edit-password-modal_js');

  if (!editPasswordForm || !editPasswordModal) {
    return;
  }

  var password = editPasswordForm.elements.oldPassword;
  var newPassword = editPasswordForm.elements.newPassword;
  var repeatNewPassword = editPasswordForm.elements.repeatNewPassword;
  var btnSubmit = editPasswordForm.querySelector('.edit-password-btn_js');
  var nameInputPassword = 'oldPassword';
  editPasswordForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var valideMessage = [];
    valideMessage = errorChecker(undefined, password.value, undefined, undefined, undefined, undefined, undefined, undefined, undefined, newPassword.value, repeatNewPassword.value);

    if (Object.keys(valideMessage[0]).length) {
      setBtnError(btnSubmit);
      Object.keys(valideMessage[0]).forEach(function (key) {
        var textError, input;

        if (key === 'password') {
          textError = valideMessage[0][key];
          input = editPasswordForm.elements[nameInputPassword];
        } else {
          textError = valideMessage[0][key];
          input = editPasswordForm.elements[key];
        }

        setError(input, textError, newPassword, editPasswordForm);
      });
    } else {
      setBtnValid(btnSubmit);
    }

    if (Object.keys(valideMessage[1]).length) {
      Object.keys(valideMessage[1]).forEach(function (key) {
        var textMessage, inputValid;

        if (key === 'password') {
          textMessage = valideMessage[1][key];
          inputValid = editPasswordForm.elements[nameInputPassword];
        } else {
          textMessage = valideMessage[1][key];
          inputValid = editPasswordForm.elements[key];
        }

        setNoError(inputValid, textMessage);
      });
    }

    if (!Object.keys(valideMessage[0]).length) {
      var data = {
        oldPassword: password.value,
        newPassword: newPassword.value
      };
      controlSpinner(editPasswordModal);
      sendrequest({
        method: 'PUT',
        url: '/api/users',
        body: JSON.stringify(data),
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          window.location.pathname = '/';
        }

        return res.json();
      }).then(function (res) {
        console.log(res);
        controlSpinner(editPasswordModal, false);

        if (res.success) {
          clearMessage(editPasswordModal);
          visualMessageSendForm(true, editPasswordModal);
        } else {
          throw res;
        }
      }).catch(function (err) {
        controlSpinner(editPasswordModal, false);
        event.target.reset();
        clearMessage(editPasswordModal);
        visualMessageSendForm(false, editPasswordModal);
      });
    }
  });
})(); //End Validate form editpassword --------------------------------------------------------------------------------------------------------------------------------------------------------------