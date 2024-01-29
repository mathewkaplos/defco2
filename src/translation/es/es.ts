const dictionary = {
  

  projectName: 'Proyecto',

  shared: {
    yes: 'Sí',
    no: 'No',
    cancel: 'Cancelar',
    save: 'Guardar',
    clear: 'Limpiar',
    decline: 'Rechazar',
    accept: 'Aceptar',
    dashboard: 'Tablero',
    new: 'Nuevo',
    searchNotFound: 'Nada encontrado.',
    searchPlaceholder: 'Buscar...',
    selectPlaceholder: 'Seleccionar una opción',
    datePlaceholder: 'Elegir una fecha',
    timePlaceholder: 'Elegir una hora',
    dateFormat: 'DD MMM, YYYY',
    timeFormat: 'HH:mm',
    datetimeFormat: 'DD MMM, YYYY HH:mm',
    tagsPlaceholder: 'Escriba y presione enter para agregar',
    edit: 'Editar',
    delete: 'Eliminar',
    openMenu: 'Abrir menú',
    submit: 'Enviar',
    search: 'Buscar',
    reset: 'Restablecer',
    min: 'Mín',
    max: 'Máx',
    view: 'Ver',
    copiedToClipboard: 'Copiado al portapapeles',
    exportToCsv: 'Exportar a CSV',
    import: 'Importar',
    pause: 'Pausar',
    discard: 'Descartar',
    preferences: 'Preferencias',
    session: 'Sesión',
    deleted: 'Eliminado',
    remove: 'Remover',
    startDate: 'Fecha de inicio',
    endDate: 'Fecha de finalización',

    importer: {
      importHashAlreadyExists: 'Los datos ya han sido importados',
      title: 'Importar archivo CSV',
      menu: 'Importar archivo CSV',
      line: 'Línea',
      status: 'Estado',
      pending: 'Pendiente',
      success: 'Importado',
      error: 'Error',
      total: `{0} importados, {1} pendientes y {2} con error`,
      importedMessage: `Procesado {0} de {1}.`,
      noValidRows: 'No hay filas válidas.',
      noNavigateAwayMessage:
        'No se aleje de esta página o la importación se detendrá.',
      completed: {
        success:
          'Importación completa. Todas las filas se importaron con éxito.',
        someErrors:
          'Procesamiento completado, pero algunas filas no pudieron ser importadas.',
        allErrors: 'La importación falló. No hay filas válidas.',
      },
      form: {
        downloadTemplate: 'Descargar la plantilla',
      },
      list: {
        newConfirm: '¿Estás seguro?',
        discardConfirm: '¿Estás seguro? Los datos no importados se perderán.',
      },
      errors: {
        invalidFileEmpty: 'El archivo está vacío',
        invalidFileCsv: 'Solo se permiten archivos CSV (.csv)',
        invalidFileUpload:
          'Archivo inválido. Asegúrese de estar utilizando la última versión de la plantilla.',
        importHashRequired: 'Se requiere el hash de importación',
        importHashExistent: 'Los datos ya han sido importados',
      },
    },

    dataTable: {
      filters: 'Filtros',
      noResults: 'No se encontraron resultados.',
      viewOptions: 'Ver',
      toggleColumns: 'Alternar columnas',
      actions: 'Acciones',

      sortAscending: 'Asc',
      sortDescending: 'Desc',
      hide: 'Ocultar',

      selectAll: 'Seleccionar todo',
      selectRow: 'Seleccionar fila',
      paginationTotal: 'Total: {0} fila(s)',
      paginationSelected: '{0} fila(s) seleccionada(s).',
      paginationRowsPerPage: 'Filas por página',
      paginationCurrent: `Página {0} de {1}`,
      paginationGoToFirst: 'Ir a la primera página',
      paginationGoToPrevious: 'Ir a la página anterior',
      paginationGoToNext: 'Ir a la siguiente página',
      paginationGoToLast: 'Ir a la última página',
    },

    locales: {
      en: 'Inglés',
      es: 'Español',
      de: 'Alemán',
      'pt-BR': 'Portugués (Brasil)',
    },

    localeSwitcher: {
      searchPlaceholder: 'Buscar idioma...',
      title: 'Idioma',
      placeholder: 'Seleccionar un idioma',
      searchEmpty: 'No se encontró el idioma.',
    },

    theme: {
      toggle: 'Tema',
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema',
    },

    errors: {
      cannotDeleteReferenced: `No se puede eliminar {0} porque está referenciado por uno o más {1}.`,
      timezone: 'Zona horaria inválida',
      required: `{0} es un campo obligatorio`,
      invalid: `{0} es inválido`,
      dateFuture: `{0} debe estar en el futuro`,
      unknown: 'Ocurrió un error',
      unique: 'El {0} ya existe',
    },
  },

  apiKey: {
    docs: {
      menu: 'Documentación de API',
    },
    form: {
      addAll: 'Añadir Todo',
    },
    edit: {
      menu: 'Editar Clave de API',
      title: 'Editar Clave de API',
      success: 'Clave de API actualizada exitosamente',
    },
    new: {
      menu: 'Nueva Clave de API',
      title: 'Nueva Clave de API',
      success: 'Clave de API creada exitosamente',
      text: `¡Guarda tu clave de API! Por razones de seguridad, solo podrás ver la clave de API una vez.`,
      subtext: `Debes añadirla al encabezado de autorización de tus llamadas a la API.`,
      backToApiKeys: 'Volver a Claves de API',
    },
    list: {
      menu: 'Claves de API',
      title: 'Claves de API',
      viewActivity: 'Ver Actividad',
      noResults: 'No se encontraron claves de API.',
    },
    destroy: {
      confirmTitle: '¿Eliminar Clave de API?',
      success: 'Clave de API eliminada exitosamente',
    },
    enumerators: {
      status: {
        active: 'Activo',
        disabled: 'Deshabilitado',
        expired: 'Expirado',
      },
    },
    fields: {
      apiKey: 'Clave de API',
      membership: 'Usuario',
      name: 'Nombre',
      keyPrefix: 'Prefijo de Clave',
      key: 'Clave',
      scopes: 'Alcances',
      expiresAt: 'Expira En',
      status: 'Estado',
      createdAt: 'Creado En',
      disabled: 'Deshabilitado',
    },
    disabledTooltip: `Deshabilitado en {0}.`,
    errors: {
      invalidScopes: 'los alcances deben coincidir con el rol del usuario',
    },
  },

  file: {
    button: 'Subir',
    delete: 'Eliminar',
    errors: {
      formats: `Formato no válido. Debe ser uno de: {0}.`,
      notImage: `El archivo debe ser una imagen`,
      tooBig: `El archivo es demasiado grande. El tamaño actual es {0} bytes, el tamaño máximo es {1} bytes`,
    },
  },

  auth: {
    signIn: {
      oauthError:
        'No es posible iniciar sesión con este proveedor. Utiliza otro.',
      title: 'Iniciar Sesión',
      button: 'Iniciar Sesión con Correo',
      success: 'Inicio de sesión exitoso',
      email: 'Correo',
      password: 'Contraseña',
      socialHeader: 'O continuar con',
      facebook: 'Facebook',
      github: 'GitHub',
      google: 'Google',
      passwordResetRequestLink: '¿Olvidaste tu contraseña?',
      signUpLink: '¿No tienes una cuenta? Crea una',
    },
    signUp: {
      title: 'Registrarse',
      signInLink: '¿Ya tienes una cuenta? Inicia sesión',
      button: 'Registrarse',
      success: 'Registro exitoso',
      email: 'Correo',
      password: 'Contraseña',
    },
    verifyEmailRequest: {
      title: 'Reenviar verificación de correo',
      button: 'Reenviar verificación de correo',
      message:
        'Por favor confirma tu correo en <strong>{0}</strong> para continuar.',
      success: 'Verificación de correo enviada exitosamente',
    },
    verifyEmailConfirm: {
      title: 'Verifica tu correo',
      success: 'Correo verificado exitosamente',
      loadingMessage: 'Un momento, tu correo está siendo verificado...',
    },
    passwordResetRequest: {
      title: 'Olvidé mi Contraseña',
      signInLink: 'Cancelar',
      button: 'Enviar correo para restablecer contraseña',
      email: 'Correo',
      success: 'Correo para restablecer contraseña enviado exitosamente',
    },
    passwordResetConfirm: {
      title: 'Restablecer Contraseña',
      signInLink: 'Cancelar',
      button: 'Restablecer Contraseña',
      password: 'Contraseña',
      success: 'Contraseña cambiada exitosamente',
    },
    noPermissions: {
      title: 'Esperando Permisos',
      message:
        'Todavía no tienes permisos. Por favor espera a que el administrador te conceda privilegios.',
    },
    invitation: {
      title: 'Invitaciones',
      success: 'Invitación aceptada exitosamente',
      acceptWrongEmail: 'Aceptar Invitación con Este Correo',
      loadingMessage: 'Un momento, estamos aceptando la invitación...',
      invalidToken: 'Token de invitación expirado o inválido.',
    },
    tenant: {
      title: 'Espacios de Trabajo',
      create: {
        name: 'Nombre del Espacio de Trabajo',
        success: 'Espacio de trabajo creado exitosamente',
        button: 'Crear Espacio de Trabajo',
      },
      select: {
        tenant: 'Selecciona un Espacio de Trabajo',
        joinSuccess: 'Te has unido al espacio de trabajo exitosamente',
        select: 'Seleccionar Espacio de Trabajo',
        acceptInvitation: 'Aceptar Invitación',
      },
    },
    passwordChange: {
      title: 'Cambiar Contraseña',
      subtitle: 'Por favor proporciona tu contraseña anterior y la nueva.',
      menu: 'Cambiar Contraseña',
      oldPassword: 'Contraseña Anterior',
      newPassword: 'Nueva Contraseña',
      newPasswordConfirmation: 'Confirmación de Nueva Contraseña',
      button: 'Guardar Contraseña',
      success: 'Contraseña cambiada y guardada exitosamente',
      mustMatch: 'Las contraseñas deben coincidir',
      cancel: 'Cancelar',
    },
    profile: {
      title: 'Perfil',
      subtitle:
        'Tu perfil será compartido entre otros usuarios en tu espacio de trabajo.',
      menu: 'Perfil',
      firstName: 'Nombre',
      lastName: 'Apellido',
      avatars: 'Avatar',
      button: 'Guardar Perfil',
      success: 'Perfil guardado exitosamente',
      cancel: 'Cancelar',
    },
    profileOnboard: {
      title: 'Perfil',
      firstName: 'Nombre',
      lastName: 'Apellido',
      avatars: 'Avatar',
      button: 'Guardar Perfil',
      success: 'Perfil guardado exitosamente',
    },
    signOut: {
      menu: 'Cerrar Sesión',
      button: 'Cerrar Sesión',
      title: 'Cerrar Sesión',
      loading: 'Se le está desconectand...',
    },
    errors: {
      invalidApiKey: 'Clave API inválida o expirada',
      emailNotFound: 'Correo no encontrado',
      userNotFound: 'Lo siento, no reconocemos tus credenciales',
      wrongPassword: 'Lo siento, no reconocemos tus credenciales',
      weakPassword: 'Esta contraseña es demasiado débil',
      emailAlreadyInUse: 'Correo ya en uso',
      invalidPasswordResetToken:
        'Enlace para restablecer contraseña inválido o expirado',
      invalidVerifyEmailToken:
        'Enlace para verificar correo inválido o expirado',
      wrongOldPassword: 'La contraseña anterior es incorrecta',
    },
  },

  tenant: {
    switcher: {
      title: 'Espacios de trabajo',
      placeholder: 'Selecciona un espacio de trabajo',
      searchPlaceholder: 'Buscar espacio de trabajo...',
      searchEmpty: 'Ningún espacio de trabajo encontrado.',
      create: 'Crear espacio de trabajo',
    },

    invite: {
      title: `Aceptar invitación a {0}`,
      message: `Has sido invitado a {0}. Puedes elegir aceptar o rechazar.`,
    },

    form: {
      name: 'Nombre',

      new: {
        title: 'Crear espacio de trabajo',
        success: 'Espacio de trabajo creado con éxito',
      },

      edit: {
        title: 'Configuración del espacio de trabajo',
        success: 'Espacio de trabajo actualizado con éxito',
      },
    },

    destroy: {
      success: 'Espacio de trabajo eliminado exitosamente',
      confirmTitle: '¿Eliminar Espacio de Trabajo?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar el espacio de trabajo {0}? ¡Esta acción es irreversible!',
    },
  },

  membership: {
    dashboardCard: {
      title: 'Usuarios',
    },

    view: {
      title: 'Ver Usuario',
    },

    showActivity: 'Actividad',

    list: {
      menu: 'Usuarios',
      title: 'Usuarios',
      noResults: 'No se encontraron usuarios.',
    },

    export: {
      success: 'Usuarios exportados exitosamente',
    },

    edit: {
      menu: 'Editar Usuario',
      title: 'Editar Usuario',
      success: 'Usuario actualizado exitosamente',
    },

    new: {
      menu: 'Nuevo Usuario',
      title: 'Nuevo Usuario',
      success: 'Usuario creado exitosamente',
    },

    destroyMany: {
      success: 'Usuario(s) eliminado(s) exitosamente',
      noSelection: 'Debes seleccionar al menos un usuario para eliminar.',
      confirmTitle: '¿Eliminar Usuario(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} usuario(s) seleccionado(s)?',
    },

    destroy: {
      success: 'Usuario eliminado exitosamente',
      noSelection: 'Debes seleccionar al menos un usuario para eliminar.',
      confirmTitle: '¿Eliminar Usuario?',
    },

    resendInvitationEmail: {
      button: 'Reenviar Correo de Invitación',
      success: 'Correo de invitación enviado exitosamente',
    },

    fields: {
      avatars: 'Avatar',
      fullName: 'Nombre Completo',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      roles: 'Roles',
      status: 'Estado',
    },

    enumerators: {
      roles: {
        admin: 'Admin',
        custom: 'Custom',
      },

      status: {
        invited: 'Invitado',
        active: 'Activo',
        disabled: 'Deshabilitado',
      },
    },

    errors: {
      cannotRemoveSelfAdminRole: 'No puedes eliminar tu propio rol de admin',
      cannotDeleteSelf: 'No puedes eliminar tu propia membresía',
      notInvited: 'No estás invitado',
      invalidStatus: `Estado inválido: {0}`,
      alreadyMember: `{0} ya es un miembro`,
      notSameEmail: `Esta invitación fue enviada a {0} pero estás ingresado como {1}. ¿Quieres continuar?`,
    },
  },

  subscription: {
    menu: 'Suscripción',
    title: 'Planes y Precios',
    current: 'Plan Actual',

    subscribe: 'Suscribirse',
    manage: 'Administrar',
    notPlanUser: 'No eres el administrador de esta suscripción.',
    cancelAtPeriodEnd: 'Este plan se cancelará al final del período.',

    plans: {
      free: {
        title: 'Gratis',
        price: '$0',
        pricingPeriod: '/mes',
        features: {
          first: 'Descripción de la primera función',
          second: 'Descripción de la segunda función',
          third: 'Descripción de la tercera función',
        },
      },
      basic: {
        title: 'Básico',
        price: '$10',
        pricingPeriod: '/mes',
        features: {
          first: 'Descripción de la primera función',
          second: 'Descripción de la segunda función',
          third: 'Descripción de la tercera función',
        },
      },
      enterprise: {
        title: 'Empresarial',
        price: '$50',
        pricingPeriod: '/mes',
        features: {
          first: 'Descripción de la primera función',
          second: 'Descripción de la segunda función',
          third: 'Descripción de la tercera función',
        },
      },
    },

    errors: {
      disabled: 'Las suscripciones están deshabilitadas en esta plataforma',
      alreadyExistsActive: 'Ya existe una suscripción activa',
      stripeNotConfigured: 'Faltan las variables de entorno de Stripe',
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
      noResults: 'No se encontraron stations.',
    },

    export: {
      success: 'Stations exportados con éxito',
    },

    new: {
      menu: 'Nuevo Station',
      title: 'Nuevo Station',
      success: 'Station creado con éxito',
    },

    view: {
      title: 'Ver Station',
    },

    edit: {
      menu: 'Editar Station',
      title: 'Editar Station',
      success: 'Station actualizado con éxito',
    },

    destroyMany: {
      success: 'Station(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Station para eliminar.',
      confirmTitle: '¿Eliminar Station(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Station(s) seleccionados?',
    },

    destroy: {
      success: 'Station eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Station para eliminar.',
      confirmTitle: '¿Eliminar Station?',
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
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      noResults: 'No se encontraron dispensers.',
    },

    export: {
      success: 'Dispensers exportados con éxito',
    },

    new: {
      menu: 'Nuevo Dispenser',
      title: 'Nuevo Dispenser',
      success: 'Dispenser creado con éxito',
    },

    view: {
      title: 'Ver Dispenser',
    },

    edit: {
      menu: 'Editar Dispenser',
      title: 'Editar Dispenser',
      success: 'Dispenser actualizado con éxito',
    },

    destroyMany: {
      success: 'Dispenser(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Dispenser para eliminar.',
      confirmTitle: '¿Eliminar Dispenser(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Dispenser(s) seleccionados?',
    },

    destroy: {
      success: 'Dispenser eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Dispenser para eliminar.',
      confirmTitle: '¿Eliminar Dispenser?',
    },

    fields: {
      name: 'Name',
      model: 'Model',
      fuelType: 'FuelType',
      station: 'Station',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      noResults: 'No se encontraron tanks.',
    },

    export: {
      success: 'Tanks exportados con éxito',
    },

    new: {
      menu: 'Nuevo Tank',
      title: 'Nuevo Tank',
      success: 'Tank creado con éxito',
    },

    view: {
      title: 'Ver Tank',
    },

    edit: {
      menu: 'Editar Tank',
      title: 'Editar Tank',
      success: 'Tank actualizado con éxito',
    },

    destroyMany: {
      success: 'Tank(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Tank para eliminar.',
      confirmTitle: '¿Eliminar Tank(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Tank(s) seleccionados?',
    },

    destroy: {
      success: 'Tank eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Tank para eliminar.',
      confirmTitle: '¿Eliminar Tank?',
    },

    fields: {
      name: 'Name',
      capacity: 'Capacity',
      station: 'Station',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      noResults: 'No se encontraron customers.',
    },

    export: {
      success: 'Customers exportados con éxito',
    },

    new: {
      menu: 'Nuevo Customer',
      title: 'Nuevo Customer',
      success: 'Customer creado con éxito',
    },

    view: {
      title: 'Ver Customer',
    },

    edit: {
      menu: 'Editar Customer',
      title: 'Editar Customer',
      success: 'Customer actualizado con éxito',
    },

    destroyMany: {
      success: 'Customer(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Customer para eliminar.',
      confirmTitle: '¿Eliminar Customer(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Customer(s) seleccionados?',
    },

    destroy: {
      success: 'Customer eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Customer para eliminar.',
      confirmTitle: '¿Eliminar Customer?',
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
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      noResults: 'No se encontraron vehicles.',
    },

    export: {
      success: 'Vehicles exportados con éxito',
    },

    new: {
      menu: 'Nuevo Vehicle',
      title: 'Nuevo Vehicle',
      success: 'Vehicle creado con éxito',
    },

    view: {
      title: 'Ver Vehicle',
    },

    edit: {
      menu: 'Editar Vehicle',
      title: 'Editar Vehicle',
      success: 'Vehicle actualizado con éxito',
    },

    destroyMany: {
      success: 'Vehicle(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Vehicle para eliminar.',
      confirmTitle: '¿Eliminar Vehicle(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Vehicle(s) seleccionados?',
    },

    destroy: {
      success: 'Vehicle eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Vehicle para eliminar.',
      confirmTitle: '¿Eliminar Vehicle?',
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
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      noResults: 'No se encontraron sales.',
    },

    export: {
      success: 'Sales exportados con éxito',
    },

    new: {
      menu: 'Nuevo Sale',
      title: 'Nuevo Sale',
      success: 'Sale creado con éxito',
    },

    view: {
      title: 'Ver Sale',
    },

    edit: {
      menu: 'Editar Sale',
      title: 'Editar Sale',
      success: 'Sale actualizado con éxito',
    },

    destroyMany: {
      success: 'Sale(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Sale para eliminar.',
      confirmTitle: '¿Eliminar Sale(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Sale(s) seleccionados?',
    },

    destroy: {
      success: 'Sale eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Sale para eliminar.',
      confirmTitle: '¿Eliminar Sale?',
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
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      noResults: 'No se encontraron cards.',
    },

    export: {
      success: 'Cards exportados con éxito',
    },

    new: {
      menu: 'Nuevo Card',
      title: 'Nuevo Card',
      success: 'Card creado con éxito',
    },

    view: {
      title: 'Ver Card',
    },

    edit: {
      menu: 'Editar Card',
      title: 'Editar Card',
      success: 'Card actualizado con éxito',
    },

    destroyMany: {
      success: 'Card(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Card para eliminar.',
      confirmTitle: '¿Eliminar Card(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Card(s) seleccionados?',
    },

    destroy: {
      success: 'Card eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Card para eliminar.',
      confirmTitle: '¿Eliminar Card?',
    },

    fields: {
      cardNo: 'Card No',
      isActive: 'Is Active',
      issueDate: 'Issue Date',
      deactivationDate: 'Deactivation Date',
      customer: 'Customer',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      noResults: 'No se encontraron products.',
    },

    export: {
      success: 'Products exportados con éxito',
    },

    new: {
      menu: 'Nuevo Product',
      title: 'Nuevo Product',
      success: 'Product creado con éxito',
    },

    view: {
      title: 'Ver Product',
    },

    edit: {
      menu: 'Editar Product',
      title: 'Editar Product',
      success: 'Product actualizado con éxito',
    },

    destroyMany: {
      success: 'Product(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Product para eliminar.',
      confirmTitle: '¿Eliminar Product(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Product(s) seleccionados?',
    },

    destroy: {
      success: 'Product eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Product para eliminar.',
      confirmTitle: '¿Eliminar Product?',
    },

    fields: {
      name: 'Name',
      price: 'Price',
      receipts: 'Receipts',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      noResults: 'No se encontraron devices.',
    },

    export: {
      success: 'Devices exportados con éxito',
    },

    new: {
      menu: 'Nuevo Device',
      title: 'Nuevo Device',
      success: 'Device creado con éxito',
    },

    view: {
      title: 'Ver Device',
    },

    edit: {
      menu: 'Editar Device',
      title: 'Editar Device',
      success: 'Device actualizado con éxito',
    },

    destroyMany: {
      success: 'Device(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Device para eliminar.',
      confirmTitle: '¿Eliminar Device(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Device(s) seleccionados?',
    },

    destroy: {
      success: 'Device eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Device para eliminar.',
      confirmTitle: '¿Eliminar Device?',
    },

    fields: {
      deviceId: 'Device Id',
      description: 'Description',
      station: 'Station',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      noResults: 'No se encontraron vouchers.',
    },

    export: {
      success: 'Vouchers exportados con éxito',
    },

    new: {
      menu: 'Nuevo Voucher',
      title: 'Nuevo Voucher',
      success: 'Voucher creado con éxito',
    },

    view: {
      title: 'Ver Voucher',
    },

    edit: {
      menu: 'Editar Voucher',
      title: 'Editar Voucher',
      success: 'Voucher actualizado con éxito',
    },

    destroyMany: {
      success: 'Voucher(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Voucher para eliminar.',
      confirmTitle: '¿Eliminar Voucher(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Voucher(s) seleccionados?',
    },

    destroy: {
      success: 'Voucher eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Voucher para eliminar.',
      confirmTitle: '¿Eliminar Voucher?',
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
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      noResults: 'No se encontraron material receipts.',
    },

    export: {
      success: 'Material Receipts exportados con éxito',
    },

    new: {
      menu: 'Nuevo Material Receipt',
      title: 'Nuevo Material Receipt',
      success: 'Material Receipt creado con éxito',
    },

    view: {
      title: 'Ver Material Receipt',
    },

    edit: {
      menu: 'Editar Material Receipt',
      title: 'Editar Material Receipt',
      success: 'Material Receipt actualizado con éxito',
    },

    destroyMany: {
      success: 'Material Receipt(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Material Receipt para eliminar.',
      confirmTitle: '¿Eliminar Material Receipt(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Material Receipt(s) seleccionados?',
    },

    destroy: {
      success: 'Material Receipt eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Material Receipt para eliminar.',
      confirmTitle: '¿Eliminar Material Receipt?',
    },

    fields: {
      date1: 'Date',
      supplier: 'Supplier',
      quantity: 'Quantity',
      price: 'Price',
      total: 'Total',
      product: 'Product',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      noResults: 'No se encontraron ranks.',
    },

    export: {
      success: 'Ranks exportados con éxito',
    },

    new: {
      menu: 'Nuevo Rank',
      title: 'Nuevo Rank',
      success: 'Rank creado con éxito',
    },

    view: {
      title: 'Ver Rank',
    },

    edit: {
      menu: 'Editar Rank',
      title: 'Editar Rank',
      success: 'Rank actualizado con éxito',
    },

    destroyMany: {
      success: 'Rank(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Rank para eliminar.',
      confirmTitle: '¿Eliminar Rank(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Rank(s) seleccionados?',
    },

    destroy: {
      success: 'Rank eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Rank para eliminar.',
      confirmTitle: '¿Eliminar Rank?',
    },

    fields: {
      name: 'Name',
      description: 'Description',
      customers: 'Customers',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
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
      menu: 'Registros de Auditoría',
      title: 'Registros de Auditoría',
      noResults: 'No se encontraron registros de auditoría.',
    },

    changesDialog: {
      title: 'Registro de Auditoría',
      changes: 'Cambios',
      noChanges: 'No hay cambios en este registro.',
    },

    export: {
      success: 'Registros de auditoría exportados exitosamente',
    },

    fields: {
      timestamp: 'Fecha',
      entityName: 'Entidad',
      entityNames: 'Entidades',
      entityId: 'ID de Entidad',
      operation: 'Operación',
      operations: 'Operaciones',
      membership: 'Usuario',
      apiKey: 'Clave API',
      apiEndpoint: 'Endpoint API',
      apiHttpResponseCode: 'Estado API',
      transactionId: 'ID de Transacción',
    },

    enumerators: {
      operation: {
        SI: 'Iniciar Sesión',
        SO: 'Cerrar Sesión',
        SU: 'Registrarse',
        PRR: 'Solicitud de Restablecimiento de Contraseña',
        PRC: 'Confirmación de Restablecimiento de Contraseña',
        PC: 'Cambio de Contraseña',
        VER: 'Solicitud de Verificación de Correo',
        VEC: 'Confirmación de Verificación de Correo',
        C: 'Crear',
        U: 'Actualizar',
        D: 'Eliminar',
        AG: 'API Get',
        APO: 'API Post',
        APU: 'API Put',
        AD: 'API Delete',
      },
    },

    dashboardCard: {
      activityChart: 'Actividad',
      activityList: 'Actividad Reciente',
    },

    readableOperations: {
      SI: '{0} inició sesión',
      SU: '{0} se registró',
      PRR: '{0} solicitó restablecer la contraseña',
      PRC: '{0} confirmó el restablecimiento de la contraseña',
      PC: '{0} cambió la contraseña',
      VER: '{0} solicitó verificar el correo',
      VEC: '{0} verificó el correo',
      C: '{0} creó {1} {2}',
      U: '{0} actualizó {1} {2}',
      D: '{0} eliminó {1} {2}',
    },
  },

  recaptcha: {
    errors: {
      disabled:
        'reCAPTCHA está deshabilitado en esta plataforma. Omitiendo verificación.',
      invalid: 'reCAPTCHA inválido',
    },
  },

  emails: {
    passwordResetEmail: {
      subject: `Restablecer tu contraseña para {0}`,
      content: `<p>Hola,</p> <p>Sigue este enlace para restablecer la contraseña de tu cuenta {0}. </p> <p><a href="{1}">{1}</a></p> <p>Si no has solicitado restablecer tu contraseña, puedes ignorar este correo.</p> <p>Gracias,</p> <p>Tu equipo de {0}</p>`,
    },
    verifyEmailEmail: {
      subject: `Verifica tu correo electrónico para {0}`,
      content: `<p>Hola,</p><p>Sigue este enlace para verificar tu dirección de correo electrónico.</p><p><a href="{1}">{1}</a></p><p>Si no has solicitado verificar esta dirección, puedes ignorar este correo.</p> <p>Gracias,</p> <p>Tu equipo de {0}</p>`,
    },
    invitationEmail: {
      singleTenant: {
        subject: `Has sido invitado a {0}`,
        content: `<p>Hola,</p> <p>Has sido invitado a {0}.</p> <p>Sigue este enlace para registrarte.</p> <p><a href="{1}">{1}</a></p> <p>Gracias,</p> <p>Tu equipo de {0}</p>`,
      },
      multiTenant: {
        subject: `Has sido invitado a {1} en {0}`,
        content: `<p>Hola,</p> <p>Has sido invitado a {2}.</p> <p>Sigue este enlace para registrarte.</p> <p><a href="{1}">{1}</a></p> <p>Gracias,</p> <p>Tu equipo de {0}</p>`,
      },
    },

    errors: {
      emailNotConfigured:
        'Faltan las variables de entorno de correo electrónico',
    },
  },
};

export default dictionary;
