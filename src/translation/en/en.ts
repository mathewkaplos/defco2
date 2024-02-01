const dictionary = {
  

  projectName: 'DEFCO',

  shared: {
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    save: 'Save',
    clear: 'Clear',
    decline: 'Decline',
    accept: 'Accept',
    dashboard: 'Dashboard',
    new: 'New',
    searchNotFound: 'Nothing found.',
    searchPlaceholder: 'Search...',
    selectPlaceholder: 'Select an option',
    datePlaceholder: 'Pick a date',
    timePlaceholder: 'Pick a time',
    dateFormat: 'MMM DD, YYYY',
    timeFormat: 'hh:mma',
    datetimeFormat: 'MMM DD, YYYY hh:mma',
    tagsPlaceholder: 'Type and press enter to add',
    edit: 'Edit',
    delete: 'Delete',
    openMenu: 'Open menu',
    submit: 'Submit',
    search: 'Search',
    reset: 'Reset',
    min: 'Min',
    max: 'Max',
    view: 'View',
    copiedToClipboard: 'Copied to clipboard',
    exportToCsv: 'Export to CSV',
    import: 'Import',
    pause: 'Pause',
    discard: 'Discard',
    preferences: 'Preferences',
    session: 'Session',
    deleted: 'Deleted',
    remove: 'Remove',
    startDate: 'Start date',
    endDate: 'End date',

    importer: {
      importHashAlreadyExists: 'Data has already been imported',
      title: 'Import CSV File',
      menu: 'Import CSV File',
      line: 'Line',
      status: 'Status',
      pending: 'Pending',
      success: 'Imported',
      error: 'Error',
      total: `{0} imported, {1} pending and {2} with error`,
      importedMessage: `Processed {0} of {1}.`,
      noValidRows: 'There are no valid rows.',
      noNavigateAwayMessage:
        'Do not navigate away from this page or import will be stopped.',
      completed: {
        success: 'Import completed. All rows were successfully imported.',
        someErrors:
          'Processing completed, but some rows were unable to be imported.',
        allErrors: 'Import failed. There are no valid rows.',
      },
      form: {
        downloadTemplate: 'Download the template',
      },
      list: {
        newConfirm: 'Are you sure?',
        discardConfirm: 'Are you sure? Non-imported data will be lost.',
      },
      errors: {
        invalidFileEmpty: 'The file is empty',
        invalidFileCsv: 'Only CSV (.csv) files are allowed',
        invalidFileUpload:
          'Invalid file. Make sure you are using the last version of the template.',
        importHashRequired: 'Import hash is required',
        importHashExistent: 'Data has already been imported',
      },
    },

    dataTable: {
      filters: 'Filters',
      noResults: 'No results found.',
      viewOptions: 'View',
      toggleColumns: 'Toggle Columns',
      actions: 'Actions',

      sortAscending: 'Asc',
      sortDescending: 'Desc',
      hide: 'Hide',

      selectAll: 'Select All',
      selectRow: 'Select Row',
      paginationTotal: 'Total: {0} row(s)',
      paginationSelected: '{0} row(s) selected.',
      paginationRowsPerPage: 'Rows per page',
      paginationCurrent: `Page {0} of {1}`,
      paginationGoToFirst: 'Go to first page',
      paginationGoToPrevious: 'Go to previous page',
      paginationGoToNext: 'Go to next page',
      paginationGoToLast: 'Go to last page',
    },

    locales: {
      en: 'English',
      es: 'Spanish',
      de: 'German',
      'pt-BR': 'Português (Brasil)',
    },

    localeSwitcher: {
      searchPlaceholder: 'Search language...',
      title: 'Language',
      placeholder: 'Select a Language',
      searchEmpty: 'No language found.',
    },

    theme: {
      toggle: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },

    errors: {
      cannotDeleteReferenced: `Cannot delete {0} because it's referenced by one or more {1}.`,
      timezone: 'Invalid timezone',
      required: `{0} is a required field`,
      invalid: `{0} is invalid`,
      dateFuture: `{0} must be in the future`,
      unknown: 'An error occurred',
      unique: `{0} must be unique`,
    },
  },

  apiKey: {
    docs: {
      menu: 'API Docs',
    },
    form: {
      addAll: 'Add All',
    },
    edit: {
      menu: 'Edit API Key',
      title: 'Edit API Key',
      success: 'API Key successfully updated',
    },
    new: {
      menu: 'New API Key',
      title: 'New API Key',
      success: 'API Key successfully created',
      text: `Save your API key! For security reasons you'll be able to see the API key only once.`,
      subtext: `You must add it to the Authorization header of your API calls.`,
      backToApiKeys: 'Back to API Keys',
    },
    list: {
      menu: 'API Keys',
      title: 'API Keys',
      viewActivity: 'View Activity',
      noResults: 'No API keys found.',
    },
    destroy: {
      confirmTitle: 'Delete API Key?',
      success: 'API Key successfully deleted',
    },
    enumerators: {
      status: {
        active: 'Active',
        disabled: 'Disabled',
        expired: 'Expired',
      },
    },
    fields: {
      apiKey: 'API Key',
      membership: 'User',
      name: 'Name',
      keyPrefix: 'Key Prefix',
      key: 'Key',
      scopes: 'Scopes',
      expiresAt: 'Expires At',
      status: 'Status',
      createdAt: 'Created At',
      disabled: 'Disabled',
    },
    disabledTooltip: `Disabled at {0}.`,
    errors: {
      invalidScopes: "scopes must match user's role",
    },
  },

  file: {
    button: 'Upload',
    delete: 'Delete',
    errors: {
      formats: `Invalid format. Must be one of: {0}.`,
      notImage: `File must be an image`,
      tooBig: `File is too big. Current size is {0} bytes, maximum size is {1} bytes`,
    },
  },

  auth: {
    signIn: {
      oauthError:
        'Not possible to sign-in with this provider. Please use another one.',
      title: 'Sign In',
      button: 'Sign In with Email',
      success: 'Successfully signed in',
      email: 'Email',
      password: 'Password',
      socialHeader: 'Or continue with',
      facebook: 'Facebook',
      github: 'GitHub',
      google: 'Google',
      passwordResetRequestLink: 'Forgot Password?',
      signUpLink: `Don't have an account? Create one`,
    },
    signUp: {
      title: 'Sign Up',
      signInLink: 'Already have an account? Sign in',
      button: 'Sign Up',
      success: 'Successfully signed up',
      email: 'Email',
      password: 'Password',
    },
    verifyEmailRequest: {
      title: 'Resend email verification',
      button: 'Resend email verification',
      message: 'Please confirm your email at <strong>{0}</strong> to continue.',
      success: 'Email verification successfully sent!',
    },
    verifyEmailConfirm: {
      title: 'Verify your email',
      success: 'Email successfully verified.',
      loadingMessage: 'Just a moment, your email is being verified...',
    },
    passwordResetRequest: {
      title: 'Forgot Password',
      signInLink: 'Cancel',
      button: 'Send password reset email',
      email: 'Email',
      success: 'Password reset email successfully sent',
    },
    passwordResetConfirm: {
      title: 'Reset Password',
      signInLink: 'Cancel',
      button: 'Reset Password',
      password: 'Password',
      success: 'Password successfully changed',
    },
    noPermissions: {
      title: 'Waiting for Permissions',
      message:
        'You have no permissions yet. Please wait for the admin to grant you privileges.',
    },
    invitation: {
      title: 'Invitations',
      success: 'Invitation successfully accepted',
      acceptWrongEmail: 'Accept Invitation With This Email',
      loadingMessage: 'Just a moment, we are accepting the invitation...',
      invalidToken: 'Expired or invalid invitation token.',
    },
    tenant: {
      title: 'Workspaces',
      create: {
        name: 'Workspace Name',
        success: 'Workspace successfully created',
        button: 'Create Workspace',
      },
      select: {
        tenant: 'Select a Workspace',
        joinSuccess: 'Successfully joined workspace',
        select: 'Select Workspace',
        acceptInvitation: 'Accept Invitation',
      },
    },
    passwordChange: {
      title: 'Password Change',
      subtitle: 'Please provide your old and new passwords.',
      menu: 'Password Change',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      newPasswordConfirmation: 'New Password Confirmation',
      button: 'Save Password',
      success: 'Password changed successfully saved',
      mustMatch: 'Passwords must match',
      cancel: 'Cancel',
    },
    profile: {
      title: 'Profile',
      subtitle:
        'Your profile will be shared among other users in your workspace.',
      menu: 'Profile',
      firstName: 'First Name',
      lastName: 'Last Name',
      avatars: 'Avatar',
      button: 'Save Profile',
      success: 'Profile successfully saved',
      cancel: 'Cancel',
    },
    profileOnboard: {
      title: 'Profile',
      firstName: 'First Name',
      lastName: 'Last Name',
      avatars: 'Avatar',
      button: 'Save Profile',
      success: 'Profile successfully saved',
    },
    signOut: {
      menu: 'Sign Out',
      button: 'Sign Out',
      title: 'Sign Out',
      loading: `You're being signed out...`,
    },
    errors: {
      invalidApiKey: 'Invalid or expired API Key',
      emailNotFound: 'Email not found',
      userNotFound: "Sorry, we don't recognize your credentials",
      wrongPassword: "Sorry, we don't recognize your credentials",
      weakPassword: 'This password is too weak',
      emailAlreadyInUse: 'Email is already in use',
      invalidPasswordResetToken:
        'Password reset link is invalid or has expired',
      invalidVerifyEmailToken:
        'Email verification link is invalid or has expired',
      wrongOldPassword: 'The old password is wrong',
    },
  },

  tenant: {
    switcher: {
      title: 'Workspaces',
      placeholder: 'Select a Workspace',
      searchPlaceholder: 'Search workspace...',
      searchEmpty: 'No workspace found.',
      create: 'Create Workspace',
    },

    invite: {
      title: `Accept Invitation to {0}`,
      message: `You've been invited to {0}. You may choose to accept or decline.`,
    },

    form: {
      name: 'Name',

      new: {
        title: 'Create Workspace',
        success: 'Workspace successfully created',
      },

      edit: {
        title: 'Workspace Settings',
        success: 'Workspace successfully updated',
      },
    },

    destroy: {
      success: 'Workspace successfully deleted',
      confirmTitle: 'Delete Workspace?',
      confirmDescription:
        'Are you sure you want to delete the {0} workspace? This action is irreversible!',
    },
  },

  membership: {
    dashboardCard: {
      title: 'Users',
    },

    view: {
      title: 'View User',
    },

    showActivity: 'Activity',

    list: {
      menu: 'Users',
      title: 'Users',
      noResults: 'No users found.',
    },

    export: {
      success: 'Users successfully exported',
    },

    edit: {
      menu: 'Edit User',
      title: 'Edit User',
      success: 'User successfully updated',
    },

    new: {
      menu: 'New User',
      title: 'New User',
      success: 'User successfully created',
    },

    destroyMany: {
      success: 'User(s) successfully deleted',
      noSelection: 'You must select at least one user to delete.',
      confirmTitle: 'Delete User(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected user(s)?',
    },

    destroy: {
      success: 'User successfully deleted',
      noSelection: 'You must select at least one user to delete.',
      confirmTitle: 'Delete User?',
    },

    resendInvitationEmail: {
      button: 'Resend Invitation Email',
      success: 'Invitation email successfully sent',
    },

    fields: {
      avatars: 'Avatar',
      fullName: 'Full Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      roles: 'Roles',
      status: 'Status',
    },

    enumerators: {
      roles: {
        admin: 'Admin',
        custom: 'Custom',
      },

      status: {
        invited: 'Invited',
        active: 'Active',
        disabled: 'Disabled',
      },
    },

    errors: {
      cannotRemoveSelfAdminRole: "You can't remove your own admin role",
      cannotDeleteSelf: "You can't remove your own membership",
      notInvited: 'You are not invited',
      invalidStatus: `Invalid status: {0}`,
      alreadyMember: `{0} is already a member`,
      notSameEmail: `This invitation was sent to {0} but you're signed in as {1}. Do you want to continue?`,
    },
  },

  subscription: {
    menu: 'Subscription',
    title: 'Plans and Pricing',
    current: 'Current Plan',

    subscribe: 'Subscribe',
    manage: 'Manage',
    notPlanUser: 'You are not the manager of this subscription.',
    cancelAtPeriodEnd: 'This plan will be canceled at the end of the period.',

    plans: {
      free: {
        title: 'Free',
        price: '$0',
        pricingPeriod: '/month',
        features: {
          first: 'First feature description',
          second: 'Second feature description',
          third: 'Third feature description',
        },
      },
      basic: {
        title: 'Basic',
        price: '$10',
        pricingPeriod: '/month',
        features: {
          first: 'First feature description',
          second: 'Second feature description',
          third: 'Third feature description',
        },
      },
      enterprise: {
        title: 'Enterprise',
        price: '$50',
        pricingPeriod: '/month',
        features: {
          first: 'First feature description',
          second: 'Second feature description',
          third: 'Third feature description',
        },
      },
    },

    errors: {
      disabled: 'Subscriptions are disabled in this platform',
      alreadyExistsActive: 'There is an active subscription already',
      stripeNotConfigured: 'Stripe ENV vars are missing',
    },
  },

  station: {
    label: 'Station',

    dashboardCard: {
      title: 'Stations',
    },

    list: {
      menu: 'Stations',
      title: 'Stations',
      noResults: 'No stations found.',
    },

    export: {
      success: 'Stations successfully exported',
    },

    new: {
      menu: 'New Station',
      title: 'New Station',
      success: 'Station successfully created',
    },

    view: {
      title: 'View Station',
    },

    edit: {
      menu: 'Edit Station',
      title: 'Edit Station',
      success: 'Station successfully updated',
    },

    destroyMany: {
      success: 'Station(s) successfully deleted',
      noSelection: 'You must select at least one station to delete.',
      confirmTitle: 'Delete Station(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected station(s)?',
    },

    destroy: {
      success: 'Station successfully deleted',
      noSelection: 'You must select at least one station to delete.',
      confirmTitle: 'Delete Station?',
    },

    fields: {
      name: 'Name',
      description: 'Description',
      location: 'Location',
      supervisor: 'Supervisor',
      dispensers: 'Dispensers',
      tanks: 'Tanks',
      sales: 'Sales',
      devices: 'Devices',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      name: '',
      description: '',
      location: '',
      supervisor: '',
      dispensers: '',
      tanks: '',
      sales: '',
      devices: '',
    },

    enumerators: {

    },
  },

  dispenser: {
    label: 'Dispenser',

    dashboardCard: {
      title: 'Dispensers',
    },

    list: {
      menu: 'Dispensers',
      title: 'Dispensers',
      noResults: 'No dispensers found.',
    },

    export: {
      success: 'Dispensers successfully exported',
    },

    new: {
      menu: 'New Dispenser',
      title: 'New Dispenser',
      success: 'Dispenser successfully created',
    },

    view: {
      title: 'View Dispenser',
    },

    edit: {
      menu: 'Edit Dispenser',
      title: 'Edit Dispenser',
      success: 'Dispenser successfully updated',
    },

    destroyMany: {
      success: 'Dispenser(s) successfully deleted',
      noSelection: 'You must select at least one dispenser to delete.',
      confirmTitle: 'Delete Dispenser(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected dispenser(s)?',
    },

    destroy: {
      success: 'Dispenser successfully deleted',
      noSelection: 'You must select at least one dispenser to delete.',
      confirmTitle: 'Delete Dispenser?',
    },

    fields: {
      name: 'Name',
      model: 'Model',
      fuelType: 'FuelType',
      station: 'Station',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      name: '',
      model: '',
      fuelType: '',
      station: '',
    },

    enumerators: {
      fuelType: {
        Petrol: 'Petrol',
        Diesel: 'Diesel',
      },
    },
  },

  tank: {
    label: 'Tank',

    dashboardCard: {
      title: 'Tanks',
    },

    list: {
      menu: 'Tanks',
      title: 'Tanks',
      noResults: 'No tanks found.',
    },

    export: {
      success: 'Tanks successfully exported',
    },

    new: {
      menu: 'New Tank',
      title: 'New Tank',
      success: 'Tank successfully created',
    },

    view: {
      title: 'View Tank',
    },

    edit: {
      menu: 'Edit Tank',
      title: 'Edit Tank',
      success: 'Tank successfully updated',
    },

    destroyMany: {
      success: 'Tank(s) successfully deleted',
      noSelection: 'You must select at least one tank to delete.',
      confirmTitle: 'Delete Tank(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected tank(s)?',
    },

    destroy: {
      success: 'Tank successfully deleted',
      noSelection: 'You must select at least one tank to delete.',
      confirmTitle: 'Delete Tank?',
    },

    fields: {
      name: 'Name',
      capacity: 'Capacity',
      station: 'Station',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      name: '',
      capacity: '',
      station: '',
    },

    enumerators: {

    },
  },

  customer: {
    label: 'Customer',

    dashboardCard: {
      title: 'Customers',
    },

    list: {
      menu: 'Customers',
      title: 'Customers',
      noResults: 'No customers found.',
    },

    export: {
      success: 'Customers successfully exported',
    },

    new: {
      menu: 'New Customer',
      title: 'New Customer',
      success: 'Customer successfully created',
    },

    view: {
      title: 'View Customer',
    },

    edit: {
      menu: 'Edit Customer',
      title: 'Edit Customer',
      success: 'Customer successfully updated',
    },

    destroyMany: {
      success: 'Customer(s) successfully deleted',
      noSelection: 'You must select at least one customer to delete.',
      confirmTitle: 'Delete Customer(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected customer(s)?',
    },

    destroy: {
      success: 'Customer successfully deleted',
      noSelection: 'You must select at least one customer to delete.',
      confirmTitle: 'Delete Customer?',
    },

    fields: {
      firstName: 'First Name',
      lastName: 'Last Name',
      otherNames: 'Other Names',
      gender: 'Gender',
      serviceNo: 'ServiceNo',
      entitledCards: 'Entitled Cards',
      status: 'Status',
      rank: 'Rank',
      vehicles: 'Vehicles',
      sales: 'Sales',
      cards: 'Cards',
      vouchers: 'Vouchers',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      firstName: 'First Name',
      lastName: 'Last Name',
      otherNames: 'Other Names',
      gender: '',
      serviceNo: '',
      entitledCards: '',
      status: '',
      rank: '',
      vehicles: '',
      sales: '',
      cards: '',
      vouchers: '',
    },

    enumerators: {
      gender: {
        Male: 'Male',
        Female: 'Female',
      },

      status: {
        active: 'Active',
        flagged: 'Flagged',
        suspended: 'Suspended',
        deactivated: 'Deactivated',
      },
    },
  },

  vehicle: {
    label: 'Vehicle',

    dashboardCard: {
      title: 'Vehicles',
    },

    list: {
      menu: 'Vehicles',
      title: 'Vehicles',
      noResults: 'No vehicles found.',
    },

    export: {
      success: 'Vehicles successfully exported',
    },

    new: {
      menu: 'New Vehicle',
      title: 'New Vehicle',
      success: 'Vehicle successfully created',
    },

    view: {
      title: 'View Vehicle',
    },

    edit: {
      menu: 'Edit Vehicle',
      title: 'Edit Vehicle',
      success: 'Vehicle successfully updated',
    },

    destroyMany: {
      success: 'Vehicle(s) successfully deleted',
      noSelection: 'You must select at least one vehicle to delete.',
      confirmTitle: 'Delete Vehicle(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected vehicle(s)?',
    },

    destroy: {
      success: 'Vehicle successfully deleted',
      noSelection: 'You must select at least one vehicle to delete.',
      confirmTitle: 'Delete Vehicle?',
    },

    fields: {
      make: 'Make',
      regNo: 'RegNo',
      cc: 'Cubic Capacity (CC)',
      fullTank: 'Full Tank Capacity',
      approved: 'Approved',
      customer: 'Customer',
      approvedBy: 'Approved By',
      vouchers: 'Vouchers',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      make: '',
      regNo: '',
      cc: 'Cubic Capacity (CC)',
      fullTank: 'Full Tank Capacity',
      approved: 'Is Approved',
      customer: '',
      approvedBy: '',
      vouchers: '',
    },

    enumerators: {

    },
  },

  sale: {
    label: 'Sale',

    dashboardCard: {
      title: 'Sales',
    },

    list: {
      menu: 'Sales',
      title: 'Sales',
      noResults: 'No sales found.',
    },

    export: {
      success: 'Sales successfully exported',
    },

    new: {
      menu: 'New Sale',
      title: 'New Sale',
      success: 'Sale successfully created',
    },

    view: {
      title: 'View Sale',
    },

    edit: {
      menu: 'Edit Sale',
      title: 'Edit Sale',
      success: 'Sale successfully updated',
    },

    destroyMany: {
      success: 'Sale(s) successfully deleted',
      noSelection: 'You must select at least one sale to delete.',
      confirmTitle: 'Delete Sale(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected sale(s)?',
    },

    destroy: {
      success: 'Sale successfully deleted',
      noSelection: 'You must select at least one sale to delete.',
      confirmTitle: 'Delete Sale?',
    },

    fields: {
      date1: 'Date',
      fuelType: 'Fuel Type',
      litres: 'Litres',
      rate: 'Rate',
      total: 'Total',
      paymode: 'Paymode',
      cashAmount: 'Cash Amount',
      mpesaAmount: 'Mpesa Amount',
      invoiceAmount: 'Invoice Amount',
      customer: 'Customer',
      station: 'Station',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      date1: 'Date',
      fuelType: '',
      litres: '',
      rate: '',
      total: '',
      paymode: '',
      cashAmount: '',
      mpesaAmount: '',
      invoiceAmount: '',
      customer: '',
      station: '',
    },

    enumerators: {
      fuelType: {
        Diesel: 'Diesel',
        Petrol: 'Petrol',
      },

      paymode: {
        Cash: 'Cash',
        MPesa: 'MPesa',
        Invoice: 'Invoice',
        Cash_MPesa: 'Cash_MPesa',
        Cash_MPesa_Invoice: 'Cash_MPesa_Invoice',
        Cash_Invoice: 'Cash_Invoice',
        MPesa_Invoice: 'MPesa_Invoice',
      },
    },
  },

  card: {
    label: 'Card',

    dashboardCard: {
      title: 'Cards',
    },

    list: {
      menu: 'Cards',
      title: 'Cards',
      noResults: 'No cards found.',
    },

    export: {
      success: 'Cards successfully exported',
    },

    new: {
      menu: 'New Card',
      title: 'New Card',
      success: 'Card successfully created',
    },

    view: {
      title: 'View Card',
    },

    edit: {
      menu: 'Edit Card',
      title: 'Edit Card',
      success: 'Card successfully updated',
    },

    destroyMany: {
      success: 'Card(s) successfully deleted',
      noSelection: 'You must select at least one card to delete.',
      confirmTitle: 'Delete Card(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected card(s)?',
    },

    destroy: {
      success: 'Card successfully deleted',
      noSelection: 'You must select at least one card to delete.',
      confirmTitle: 'Delete Card?',
    },

    fields: {
      cardNo: 'Card No',
      isActive: 'Is Active',
      issueDate: 'Issue Date',
      deactivationDate: 'Deactivation Date',
      customer: 'Customer',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      cardNo: '',
      isActive: '',
      issueDate: '',
      deactivationDate: '',
      customer: '',
    },

    enumerators: {

    },
  },

  product: {
    label: 'Product',

    dashboardCard: {
      title: 'Products',
    },

    list: {
      menu: 'Products',
      title: 'Products',
      noResults: 'No products found.',
    },

    export: {
      success: 'Products successfully exported',
    },

    new: {
      menu: 'New Product',
      title: 'New Product',
      success: 'Product successfully created',
    },

    view: {
      title: 'View Product',
    },

    edit: {
      menu: 'Edit Product',
      title: 'Edit Product',
      success: 'Product successfully updated',
    },

    destroyMany: {
      success: 'Product(s) successfully deleted',
      noSelection: 'You must select at least one product to delete.',
      confirmTitle: 'Delete Product(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected product(s)?',
    },

    destroy: {
      success: 'Product successfully deleted',
      noSelection: 'You must select at least one product to delete.',
      confirmTitle: 'Delete Product?',
    },

    fields: {
      name: 'Name',
      price: 'Price',
      receipts: 'Receipts',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      name: '',
      price: '',
      receipts: '',
    },

    enumerators: {

    },
  },

  device: {
    label: 'Device',

    dashboardCard: {
      title: 'Devices',
    },

    list: {
      menu: 'Devices',
      title: 'Devices',
      noResults: 'No devices found.',
    },

    export: {
      success: 'Devices successfully exported',
    },

    new: {
      menu: 'New Device',
      title: 'New Device',
      success: 'Device successfully created',
    },

    view: {
      title: 'View Device',
    },

    edit: {
      menu: 'Edit Device',
      title: 'Edit Device',
      success: 'Device successfully updated',
    },

    destroyMany: {
      success: 'Device(s) successfully deleted',
      noSelection: 'You must select at least one device to delete.',
      confirmTitle: 'Delete Device(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected device(s)?',
    },

    destroy: {
      success: 'Device successfully deleted',
      noSelection: 'You must select at least one device to delete.',
      confirmTitle: 'Delete Device?',
    },

    fields: {
      deviceId: 'Device Id',
      description: 'Description',
      station: 'Station',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      deviceId: '',
      description: '',
      station: '',
    },

    enumerators: {

    },
  },

  voucher: {
    label: 'Voucher',

    dashboardCard: {
      title: 'Vouchers',
    },

    list: {
      menu: 'Vouchers',
      title: 'Vouchers',
      noResults: 'No vouchers found.',
    },

    export: {
      success: 'Vouchers successfully exported',
    },

    new: {
      menu: 'New Voucher',
      title: 'New Voucher',
      success: 'Voucher successfully created',
    },

    view: {
      title: 'View Voucher',
    },

    edit: {
      menu: 'Edit Voucher',
      title: 'Edit Voucher',
      success: 'Voucher successfully updated',
    },

    destroyMany: {
      success: 'Voucher(s) successfully deleted',
      noSelection: 'You must select at least one voucher to delete.',
      confirmTitle: 'Delete Voucher(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected voucher(s)?',
    },

    destroy: {
      success: 'Voucher successfully deleted',
      noSelection: 'You must select at least one voucher to delete.',
      confirmTitle: 'Delete Voucher?',
    },

    fields: {
      date1: 'Date',
      voucherNo: 'Voucher No',
      indentNo: 'Indent No',
      approvedBy: 'Approved By',
      qty: 'Qty',
      amount: 'Amount',
      customer: 'Customer',
      vehicle: 'Vehicle',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      date1: '',
      voucherNo: '',
      indentNo: '',
      approvedBy: '',
      qty: '',
      amount: '',
      customer: '',
      vehicle: '',
    },

    enumerators: {

    },
  },

  materialReceipt: {
    label: 'Material Receipt',

    dashboardCard: {
      title: 'Material Receipts',
    },

    list: {
      menu: 'Material Receipts',
      title: 'Material Receipts',
      noResults: 'No material receipts found.',
    },

    export: {
      success: 'Material Receipts successfully exported',
    },

    new: {
      menu: 'New Material Receipt',
      title: 'New Material Receipt',
      success: 'Material Receipt successfully created',
    },

    view: {
      title: 'View Material Receipt',
    },

    edit: {
      menu: 'Edit Material Receipt',
      title: 'Edit Material Receipt',
      success: 'Material Receipt successfully updated',
    },

    destroyMany: {
      success: 'Material Receipt(s) successfully deleted',
      noSelection: 'You must select at least one material receipt to delete.',
      confirmTitle: 'Delete Material Receipt(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected material receipt(s)?',
    },

    destroy: {
      success: 'Material Receipt successfully deleted',
      noSelection: 'You must select at least one material receipt to delete.',
      confirmTitle: 'Delete Material Receipt?',
    },

    fields: {
      date1: 'Date',
      supplier: 'Supplier',
      quantity: 'Quantity',
      price: 'Price',
      total: 'Total',
      product: 'Product',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      date1: '',
      supplier: '',
      quantity: '',
      price: '',
      total: '',
      product: '',
    },

    enumerators: {

    },
  },

  rank: {
    label: 'Rank',

    dashboardCard: {
      title: 'Ranks',
    },

    list: {
      menu: 'Ranks',
      title: 'Ranks',
      noResults: 'No ranks found.',
    },

    export: {
      success: 'Ranks successfully exported',
    },

    new: {
      menu: 'New Rank',
      title: 'New Rank',
      success: 'Rank successfully created',
    },

    view: {
      title: 'View Rank',
    },

    edit: {
      menu: 'Edit Rank',
      title: 'Edit Rank',
      success: 'Rank successfully updated',
    },

    destroyMany: {
      success: 'Rank(s) successfully deleted',
      noSelection: 'You must select at least one rank to delete.',
      confirmTitle: 'Delete Rank(s)?',
      confirmDescription:
        'Are you sure you want to delete the {0} selected rank(s)?',
    },

    destroy: {
      success: 'Rank successfully deleted',
      noSelection: 'You must select at least one rank to delete.',
      confirmTitle: 'Delete Rank?',
    },

    fields: {
      name: 'Name',
      description: 'Description',
      customers: 'Customers',
      createdByMembership: 'Created By',
      updatedByMembership: 'Updated By',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
    },

    hints: {
      name: '',
      description: '',
      customers: '',
    },

    enumerators: {

    },
  },

  auditLog: {
    list: {
      menu: 'Audit Logs',
      title: 'Audit Logs',
      noResults: 'No audit logs found.',
    },

    changesDialog: {
      title: 'Audit Log',
      changes: 'Changes',
      noChanges: 'There are no changes in this log.',
    },

    export: {
      success: 'Audit Logs successfully exported',
    },

    fields: {
      timestamp: 'Date',
      entityName: 'Entity',
      entityNames: 'Entities',
      entityId: 'Entity ID',
      operation: 'Operation',
      operations: 'Operations',
      membership: 'User',
      apiKey: 'API Key',
      apiEndpoint: 'API Endpoint',
      apiHttpResponseCode: 'API Status',
      transactionId: 'Transaction ID',
    },

    enumerators: {
      operation: {
        SI: 'Sign In',
        SO: 'Sign Out',
        SU: 'Sign Up',
        PRR: 'Password Reset Request',
        PRC: 'Password Reset Confirm',
        PC: 'Password Change',
        VER: 'Verify Email Request',
        VEC: 'Verify Email Confirm',
        C: 'Create',
        U: 'Update',
        D: 'Delete',
        AG: 'API Get',
        APO: 'API Post',
        APU: 'API Put',
        AD: 'API Delete',
      },
    },

    dashboardCard: {
      activityChart: 'Activity',
      activityList: 'Recent Activity',
    },

    readableOperations: {
      SI: '{0} signed in',
      SU: '{0} registered',
      PRR: '{0} requested to reset the password',
      PRC: '{0} confirmed password reset',
      PC: '{0} changed the password',
      VER: '{0} requested to verify the email',
      VEC: '{0} verified the email',
      C: '{0} created {1} {2}',
      U: '{0} updated {1} {2}',
      D: '{0} deleted {1} {2}',
    },
  },

  recaptcha: {
    errors: {
      disabled:
        'reCAPTCHA is disabled in this platform. Skipping verification.',
      invalid: 'Invalid reCAPTCHA',
    },
  },

  emails: {
    passwordResetEmail: {
      subject: `Reset your password for {0}`,
      content: `<p>Hello,</p> <p> Follow this link to reset your {0} password for your account. </p> <p><a href="{1}">{1}</a></p> <p> If you didn’t ask to reset your password, you can ignore this email. </p> <p>Thanks,</p> <p>Your {0} team</p>`,
    },
    verifyEmailEmail: {
      subject: `Verify your email for {0}`,
      content: `<p>Hello,</p><p>Follow this link to verify your email address.</p><p><a href="{1}">{1}</a></p><p>If you didn’t ask to verify this address, you can ignore this email. </p> <p>Thanks,</p> <p>Your {0} team</p>`,
    },
    invitationEmail: {
      singleTenant: {
        subject: `You've been invited to {0}`,
        content: `<p>Hello,</p> <p>You've been invited to {0}.</p> <p>Follow this link to register.</p> <p><a href="{1}">{1}</a></p> <p>Thanks,</p> <p>Your {0} team</p>`,
      },
      multiTenant: {
        subject: `You've been invited to {1} at {0}`,
        content: `<p>Hello,</p> <p>You've been invited to {2}.</p> <p>Follow this link to register.</p> <p><a href="{1}">{1}</a></p> <p>Thanks,</p> <p>Your {0} team</p>`,
      },
    },

    errors: {
      emailNotConfigured: 'Email ENV vars are missing',
    },
  },
};

export default dictionary;
