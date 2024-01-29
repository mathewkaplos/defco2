const dictionary = {
  

  projectName: 'Projekt',

  shared: {
    yes: 'Ja',
    no: 'Nein',
    cancel: 'Abbrechen',
    save: 'Speichern',
    clear: 'Leeren',
    decline: 'Ablehnen',
    accept: 'Akzeptieren',
    dashboard: 'Dashboard',
    new: 'Neu',
    searchNotFound: 'Nichts gefunden.',
    searchPlaceholder: 'Suchen...',
    selectPlaceholder: 'Option auswählen',
    datePlaceholder: 'Datum auswählen',
    timePlaceholder: 'Zeit auswählen',
    dateFormat: 'DD. MMM YYYY',
    timeFormat: 'HH:mm',
    datetimeFormat: 'DD. MMM YYYY HH:mm',
    tagsPlaceholder: 'Tippen und Enter drücken, um hinzuzufügen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    openMenu: 'Menü öffnen',
    submit: 'Absenden',
    search: 'Suche',
    reset: 'Zurücksetzen',
    min: 'Min',
    max: 'Max',
    view: 'Ansicht',
    copiedToClipboard: 'In die Zwischenablage kopiert',
    exportToCsv: 'Als CSV exportieren',
    import: 'Importieren',
    pause: 'Pausieren',
    discard: 'Verwerfen',
    preferences: 'Einstellungen',
    session: 'Sitzung',
    deleted: 'Gelöscht',
    remove: 'Entfernen',
    startDate: 'Startdatum',
    endDate: 'Enddatum',

    importer: {
      importHashAlreadyExists: 'Daten wurden bereits importiert',
      title: 'CSV-Datei importieren',
      menu: 'CSV-Datei importieren',
      line: 'Zeile',
      status: 'Status',
      pending: 'Ausstehend',
      success: 'Importiert',
      error: 'Fehler',
      total: `{0} importiert, {1} ausstehend und {2} mit Fehler`,
      importedMessage: `{0} von {1} verarbeitet.`,
      noValidRows: 'Keine gültigen Zeilen.',
      noNavigateAwayMessage:
        'Diese Seite nicht verlassen, sonst wird der Import gestoppt.',
      completed: {
        success:
          'Import abgeschlossen. Alle Zeilen wurden erfolgreich importiert.',
        someErrors:
          'Verarbeitung abgeschlossen, einige Zeilen konnten jedoch nicht importiert werden.',
        allErrors: 'Import fehlgeschlagen. Keine gültigen Zeilen.',
      },
      form: {
        downloadTemplate: 'Vorlage herunterladen',
      },
      list: {
        newConfirm: 'Sind Sie sicher?',
        discardConfirm:
          'Sind Sie sicher? Nicht importierte Daten gehen verloren.',
      },
      errors: {
        invalidFileEmpty: 'Die Datei ist leer',
        invalidFileCsv: 'Nur CSV (.csv) Dateien sind erlaubt',
        invalidFileUpload:
          'Ungültige Datei. Stellen Sie sicher, dass Sie die neueste Version der Vorlage verwenden.',
        importHashRequired: 'Import-Hash ist erforderlich',
        importHashExistent: 'Daten wurden bereits importiert',
      },
    },

    dataTable: {
      filters: 'Filter',
      noResults: 'Keine Ergebnisse gefunden.',
      viewOptions: 'Ansicht',
      toggleColumns: 'Spalten umschalten',
      actions: 'Aktionen',
      sortAscending: 'Aufsteigend',
      sortDescending: 'Absteigend',
      hide: 'Ausblenden',
      selectAll: 'Alles auswählen',
      selectRow: 'Zeile auswählen',
      paginationTotal: 'Insgesamt: {0} Zeile(n)',
      paginationSelected: '{0} Zeile(n) ausgewählt.',
      paginationRowsPerPage: 'Zeilen pro Seite',
      paginationCurrent: `Seite {0} von {1}`,
      paginationGoToFirst: 'Zur ersten Seite gehen',
      paginationGoToPrevious: 'Zur vorherigen Seite gehen',
      paginationGoToNext: 'Zur nächsten Seite gehen',
      paginationGoToLast: 'Zur letzten Seite gehen',
    },

    locales: {
      en: 'Englisch',
      es: 'Spanisch',
      de: 'Deutsch',
      'pt-BR': 'Portugiesisch (Brasilien)',
    },

    localeSwitcher: {
      searchPlaceholder: 'Sprache suchen...',
      title: 'Sprache',
      placeholder: 'Sprache auswählen',
      searchEmpty: 'Keine Sprache gefunden.',
    },

    theme: {
      toggle: 'Design',
      light: 'Hell',
      dark: 'Dunkel',
      system: 'System',
    },

    errors: {
      cannotDeleteReferenced: `Kann {0} nicht löschen, da es von einem oder mehreren {1} referenziert wird.`,
      timezone: 'Ungültige Zeitzone',
      required: `{0} ist ein Pflichtfeld`,
      invalid: `{0} ist ungültig`,
      dateFuture: `{0} muss in der Zukunft liegen`,
      unknown: 'Ein Fehler ist aufgetreten',
      unique: `{0} muss eindeutig sein`,
    },
  },

  apiKey: {
    docs: {
      menu: 'API-Dokumentation',
    },
    form: {
      addAll: 'Alle hinzufügen',
    },
    edit: {
      menu: 'API-Schlüssel bearbeiten',
      title: 'API-Schlüssel bearbeiten',
      success: 'API-Schlüssel erfolgreich aktualisiert',
    },
    new: {
      menu: 'Neuer API-Schlüssel',
      title: 'Neuer API-Schlüssel',
      success: 'API-Schlüssel erfolgreich erstellt',
      text: `Speichern Sie Ihren API-Schlüssel! Aus Sicherheitsgründen können Sie den API-Schlüssel nur einmal sehen.`,
      subtext: `Sie müssen ihn im Authorization-Header Ihrer API-Aufrufe hinzufügen.`,
      backToApiKeys: 'Zurück zu API-Schlüsseln',
    },
    list: {
      menu: 'API-Schlüssel',
      title: 'API-Schlüssel',
      viewActivity: 'Aktivität anzeigen',
      noResults: 'Keine API-Schlüssel gefunden.',
    },
    destroy: {
      confirmTitle: 'API-Schlüssel löschen?',
      success: 'API-Schlüssel erfolgreich gelöscht',
    },
    enumerators: {
      status: {
        active: 'Aktiv',
        disabled: 'Deaktiviert',
        expired: 'Abgelaufen',
      },
    },
    fields: {
      apiKey: 'API-Schlüssel',
      membership: 'Benutzer',
      name: 'Name',
      keyPrefix: 'Schlüsselpräfix',
      key: 'Schlüssel',
      scopes: 'Bereiche',
      expiresAt: 'Läuft ab am',
      status: 'Status',
      createdAt: 'Erstellt am',
      disabled: 'Deaktiviert',
    },
    disabledTooltip: `Deaktiviert am {0}.`,
    errors: {
      invalidScopes: 'Bereiche müssen der Rolle des Benutzers entsprechen',
    },
  },

  file: {
    button: 'Hochladen',
    delete: 'Löschen',
    errors: {
      formats: `Ungültiges Format. Muss eines der folgenden sein: {0}.`,
      notImage: `Datei muss ein Bild sein`,
      tooBig: `Datei ist zu groß. Aktuelle Größe ist {0} Bytes, maximale Größe ist {1} Bytes`,
    },
  },

  auth: {
    signIn: {
      oauthError:
        'Anmeldung mit diesem Anbieter nicht möglich. Bitte einen anderen verwenden.',
      title: 'Anmelden',
      button: 'Mit E-Mail anmelden',
      success: 'Erfolgreich angemeldet',
      email: 'E-Mail',
      password: 'Passwort',
      socialHeader: 'Oder weiter mit',
      facebook: 'Facebook',
      github: 'GitHub',
      google: 'Google',
      passwordResetRequestLink: 'Passwort vergessen?',
      signUpLink: 'Noch kein Konto? Erstellen',
    },
    signUp: {
      title: 'Registrieren',
      signInLink: 'Bereits ein Konto? Anmelden',
      button: 'Registrieren',
      success: 'Erfolgreich registriert',
      email: 'E-Mail',
      password: 'Passwort',
    },
    verifyEmailRequest: {
      title: 'E-Mail-Verifikation erneut senden',
      button: 'E-Mail-Verifikation erneut senden',
      message:
        'Bitte bestätige deine E-Mail-Adresse bei <strong>{0}</strong>, um fortzufahren.',
      success: 'E-Mail-Verifikation erfolgreich gesendet!',
    },
    verifyEmailConfirm: {
      title: 'E-Mail verifizieren',
      success: 'E-Mail erfolgreich verifiziert.',
      loadingMessage: 'Einen Moment, deine E-Mail wird verifiziert...',
    },
    passwordResetRequest: {
      title: 'Passwort vergessen',
      signInLink: 'Abbrechen',
      button: 'E-Mail zum Zurücksetzen des Passworts senden',
      email: 'E-Mail',
      success: 'E-Mail zum Zurücksetzen des Passworts erfolgreich gesendet',
    },
    passwordResetConfirm: {
      title: 'Passwort zurücksetzen',
      signInLink: 'Abbrechen',
      button: 'Passwort zurücksetzen',
      password: 'Passwort',
      success: 'Passwort erfolgreich geändert',
    },
    noPermissions: {
      title: 'Warten auf Berechtigungen',
      message:
        'Du hast noch keine Berechtigungen. Bitte warte, bis der Admin dir Rechte gewährt.',
    },
    invitation: {
      title: 'Einladungen',
      success: 'Einladung erfolgreich angenommen',
      acceptWrongEmail: 'Einladung mit dieser E-Mail annehmen',
      loadingMessage: 'Einen Moment, wir akzeptieren die Einladung...',
      invalidToken: 'Abgelaufener oder ungültiger Einladungstoken.',
    },
    tenant: {
      title: 'Arbeitsbereiche',
      create: {
        name: 'Name des Arbeitsbereichs',
        success: 'Arbeitsbereich erfolgreich erstellt',
        button: 'Arbeitsbereich erstellen',
      },
      select: {
        tenant: 'Einen Arbeitsbereich auswählen',
        joinSuccess: 'Erfolgreich dem Arbeitsbereich beigetreten',
        select: 'Arbeitsbereich auswählen',
        acceptInvitation: 'Einladung annehmen',
      },
    },
    passwordChange: {
      title: 'Passwort ändern',
      subtitle: 'Bitte gib dein altes und dein neues Passwort ein.',
      menu: 'Passwort ändern',
      oldPassword: 'Altes Passwort',
      newPassword: 'Neues Passwort',
      newPasswordConfirmation: 'Neues Passwort bestätigen',
      button: 'Passwort speichern',
      success: 'Passwort erfolgreich gespeichert',
      mustMatch: 'Passwörter müssen übereinstimmen',
      cancel: 'Abbrechen',
    },
    profile: {
      title: 'Profil',
      subtitle:
        'Dein Profil wird unter den anderen Benutzern in deinem Arbeitsbereich geteilt.',
      menu: 'Profil',
      firstName: 'Vorname',
      lastName: 'Nachname',
      avatars: 'Avatar',
      button: 'Profil speichern',
      success: 'Profil erfolgreich gespeichert',
      cancel: 'Abbrechen',
    },
    profileOnboard: {
      title: 'Profil',
      firstName: 'Vorname',
      lastName: 'Nachname',
      avatars: 'Avatar',
      button: 'Profil speichern',
      success: 'Profil erfolgreich gespeichert',
    },
    signOut: {
      menu: 'Abmelden',
      button: 'Abmelden',
      title: 'Abmelden',
      loading: 'Sie werden abgemeldet...',
    },
    errors: {
      invalidApiKey: 'Ungültiger oder abgelaufener API-Schlüssel',
      emailNotFound: 'E-Mail nicht gefunden',
      userNotFound: 'Leider erkennen wir deine Anmeldedaten nicht',
      wrongPassword: 'Leider erkennen wir deine Anmeldedaten nicht',
      weakPassword: 'Dieses Passwort ist zu schwach',
      emailAlreadyInUse: 'E-Mail wird bereits verwendet',
      invalidPasswordResetToken:
        'Link zum Zurücksetzen des Passworts ist ungültig oder abgelaufen',
      invalidVerifyEmailToken:
        'E-Mail-Verifizierungslink ist ungültig oder abgelaufen',
      wrongOldPassword: 'Das alte Passwort ist falsch',
    },
  },

  tenant: {
    switcher: {
      title: 'Arbeitsbereiche',
      placeholder: 'Einen Arbeitsbereich auswählen',
      searchPlaceholder: 'Arbeitsbereich suchen...',
      searchEmpty: 'Kein Arbeitsbereich gefunden.',
      create: 'Arbeitsbereich erstellen',
    },

    invite: {
      title: `Einladung zu {0} annehmen`,
      message: `Du wurdest zu {0} eingeladen. Du kannst wählen, ob du annimmst oder ablehnst.`,
    },

    form: {
      name: 'Name',

      new: {
        title: 'Arbeitsbereich erstellen',
        success: 'Arbeitsbereich erfolgreich erstellt',
      },

      edit: {
        title: 'Einstellungen des Arbeitsbereichs',
        success: 'Arbeitsbereich erfolgreich aktualisiert',
      },
    },

    destroy: {
      success: 'Arbeitsbereich erfolgreich gelöscht',
      confirmTitle: 'Arbeitsbereich löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie den Arbeitsbereich {0} löschen möchten? Diese Aktion ist nicht rückgängig zu machen!',
    },
  },

  membership: {
    dashboardCard: {
      title: 'Benutzer',
    },

    showActivity: 'Aktivität',

    view: {
      title: 'Benutzer anzeigen',
    },

    list: {
      menu: 'Benutzer',
      title: 'Benutzer',
      noResults: 'Keine Benutzer gefunden.',
    },

    export: {
      success: 'Benutzer erfolgreich exportiert',
    },

    edit: {
      menu: 'Benutzer bearbeiten',
      title: 'Benutzer bearbeiten',
      success: 'Benutzer erfolgreich aktualisiert',
    },

    new: {
      menu: 'Neuer Benutzer',
      title: 'Neuer Benutzer',
      success: 'Benutzer erfolgreich erstellt',
    },

    destroyMany: {
      success: 'Benutzer erfolgreich gelöscht',
      noSelection: 'Du musst mindestens einen Benutzer auswählen, um ihn zu löschen.',
      confirmTitle: 'Benutzer löschen?',
      confirmDescription:
        'Bist du sicher, dass du die {0} ausgewählten Benutzer löschen möchtest?',
    },

    destroy: {
      success: 'Benutzer erfolgreich gelöscht',
      noSelection: 'Du musst mindestens einen Benutzer auswählen, um ihn zu löschen.',
      confirmTitle: 'Benutzer löschen?',
    },

    resendInvitationEmail: {
      button: 'Einladungsemail erneut senden',
      success: 'Einladungsemail erfolgreich gesendet',
    },

    fields: {
      avatars: 'Avatar',
      fullName: 'Vollständiger Name',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      roles: 'Rollen',
      status: 'Status',
    },

    enumerators: {
      roles: {
        admin: 'Admin',
        custom: 'Benutzerdefiniert',
      },

      status: {
        invited: 'Eingeladen',
        active: 'Aktiv',
        disabled: 'Deaktiviert',
      },
    },

    errors: {
      cannotRemoveSelfAdminRole:
        'Du kannst deine eigene Admin-Rolle nicht entfernen',
      cannotDeleteSelf: 'Du kannst deine eigene Mitgliedschaft nicht entfernen',
      notInvited: 'Du bist nicht eingeladen',
      invalidStatus: `Ungültiger Status: {0}`,
      alreadyMember: `{0} ist bereits Mitglied`,
      notSameEmail: `Diese Einladung wurde an {0} gesendet, aber du bist als {1} angemeldet. Möchtest du fortfahren?`,
    },
  },

  subscription: {
    menu: 'Abonnement',
    title: 'Tarife und Preise',
    current: 'Aktueller Tarif',

    subscribe: 'Abonnieren',
    manage: 'Verwalten',
    notPlanUser: 'Du bist nicht der Manager dieses Abonnements.',
    cancelAtPeriodEnd: 'Dieser Tarif wird am Ende des Zeitraums gekündigt.',

    plans: {
      free: {
        title: 'Kostenlos',
        price: '0 €',
        pricingPeriod: '/Monat',
        features: {
          first: 'Erste Funktion Beschreibung',
          second: 'Zweite Funktion Beschreibung',
          third: 'Dritte Funktion Beschreibung',
        },
      },
      basic: {
        title: 'Basis',
        price: '10 €',
        pricingPeriod: '/Monat',
        features: {
          first: 'Erste Funktion Beschreibung',
          second: 'Zweite Funktion Beschreibung',
          third: 'Dritte Funktion Beschreibung',
        },
      },
      enterprise: {
        title: 'Unternehmen',
        price: '50 €',
        pricingPeriod: '/Monat',
        features: {
          first: 'Erste Funktion Beschreibung',
          second: 'Zweite Funktion Beschreibung',
          third: 'Dritte Funktion Beschreibung',
        },
      },
    },

    errors: {
      disabled: 'Abonnements sind auf dieser Plattform deaktiviert',
      alreadyExistsActive: 'Es gibt bereits ein aktives Abonnement',
      stripeNotConfigured: 'Stripe-Umgebungsvariablen fehlen',
    },
  },

  station: {
    label: 'Stations',

    dashboardCard: {
      title: 'Stations',
    },

    list: {
      menu: 'Stations',
      title: 'Stations',
      noResults: 'Keine stations gefunden.',
    },

    export: {
      success: 'Stations erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Station',
    },

    new: {
      menu: 'Neuer Station',
      title: 'Neuer Station',
      success: 'Station erfolgreich erstellt',
    },

    edit: {
      menu: 'Stations bearbeiten',
      title: 'Stations bearbeiten',
      success: 'Station erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Station(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Stations auswählen, um ihn zu löschen.',
      confirmTitle: 'Station(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Stations löschen möchten?',
    },

    destroy: {
      success: 'Station erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Stations auswählen, um ihn zu löschen.',
      confirmTitle: 'Stations löschen?',
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
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
    label: 'Dispensers',

    dashboardCard: {
      title: 'Dispensers',
    },

    list: {
      menu: 'Dispensers',
      title: 'Dispensers',
      noResults: 'Keine dispensers gefunden.',
    },

    export: {
      success: 'Dispensers erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Dispenser',
    },

    new: {
      menu: 'Neuer Dispenser',
      title: 'Neuer Dispenser',
      success: 'Dispenser erfolgreich erstellt',
    },

    edit: {
      menu: 'Dispensers bearbeiten',
      title: 'Dispensers bearbeiten',
      success: 'Dispenser erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Dispenser(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Dispensers auswählen, um ihn zu löschen.',
      confirmTitle: 'Dispenser(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Dispensers löschen möchten?',
    },

    destroy: {
      success: 'Dispenser erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Dispensers auswählen, um ihn zu löschen.',
      confirmTitle: 'Dispensers löschen?',
    },

    fields: {
      name: 'Name',
      model: 'Model',
      fuelType: 'FuelType',
      station: 'Station',
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
    label: 'Tanks',

    dashboardCard: {
      title: 'Tanks',
    },

    list: {
      menu: 'Tanks',
      title: 'Tanks',
      noResults: 'Keine tanks gefunden.',
    },

    export: {
      success: 'Tanks erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Tank',
    },

    new: {
      menu: 'Neuer Tank',
      title: 'Neuer Tank',
      success: 'Tank erfolgreich erstellt',
    },

    edit: {
      menu: 'Tanks bearbeiten',
      title: 'Tanks bearbeiten',
      success: 'Tank erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Tank(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Tanks auswählen, um ihn zu löschen.',
      confirmTitle: 'Tank(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Tanks löschen möchten?',
    },

    destroy: {
      success: 'Tank erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Tanks auswählen, um ihn zu löschen.',
      confirmTitle: 'Tanks löschen?',
    },

    fields: {
      name: 'Name',
      capacity: 'Capacity',
      station: 'Station',
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
    label: 'Customers',

    dashboardCard: {
      title: 'Customers',
    },

    list: {
      menu: 'Customers',
      title: 'Customers',
      noResults: 'Keine customers gefunden.',
    },

    export: {
      success: 'Customers erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Customer',
    },

    new: {
      menu: 'Neuer Customer',
      title: 'Neuer Customer',
      success: 'Customer erfolgreich erstellt',
    },

    edit: {
      menu: 'Customers bearbeiten',
      title: 'Customers bearbeiten',
      success: 'Customer erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Customer(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Customers auswählen, um ihn zu löschen.',
      confirmTitle: 'Customer(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Customers löschen möchten?',
    },

    destroy: {
      success: 'Customer erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Customers auswählen, um ihn zu löschen.',
      confirmTitle: 'Customers löschen?',
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
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
    label: 'Vehicles',

    dashboardCard: {
      title: 'Vehicles',
    },

    list: {
      menu: 'Vehicles',
      title: 'Vehicles',
      noResults: 'Keine vehicles gefunden.',
    },

    export: {
      success: 'Vehicles erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Vehicle',
    },

    new: {
      menu: 'Neuer Vehicle',
      title: 'Neuer Vehicle',
      success: 'Vehicle erfolgreich erstellt',
    },

    edit: {
      menu: 'Vehicles bearbeiten',
      title: 'Vehicles bearbeiten',
      success: 'Vehicle erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Vehicle(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Vehicles auswählen, um ihn zu löschen.',
      confirmTitle: 'Vehicle(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Vehicles löschen möchten?',
    },

    destroy: {
      success: 'Vehicle erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Vehicles auswählen, um ihn zu löschen.',
      confirmTitle: 'Vehicles löschen?',
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
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
    label: 'Sales',

    dashboardCard: {
      title: 'Sales',
    },

    list: {
      menu: 'Sales',
      title: 'Sales',
      noResults: 'Keine sales gefunden.',
    },

    export: {
      success: 'Sales erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Sale',
    },

    new: {
      menu: 'Neuer Sale',
      title: 'Neuer Sale',
      success: 'Sale erfolgreich erstellt',
    },

    edit: {
      menu: 'Sales bearbeiten',
      title: 'Sales bearbeiten',
      success: 'Sale erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Sale(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Sales auswählen, um ihn zu löschen.',
      confirmTitle: 'Sale(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Sales löschen möchten?',
    },

    destroy: {
      success: 'Sale erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Sales auswählen, um ihn zu löschen.',
      confirmTitle: 'Sales löschen?',
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
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
    label: 'Cards',

    dashboardCard: {
      title: 'Cards',
    },

    list: {
      menu: 'Cards',
      title: 'Cards',
      noResults: 'Keine cards gefunden.',
    },

    export: {
      success: 'Cards erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Card',
    },

    new: {
      menu: 'Neuer Card',
      title: 'Neuer Card',
      success: 'Card erfolgreich erstellt',
    },

    edit: {
      menu: 'Cards bearbeiten',
      title: 'Cards bearbeiten',
      success: 'Card erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Card(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Cards auswählen, um ihn zu löschen.',
      confirmTitle: 'Card(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Cards löschen möchten?',
    },

    destroy: {
      success: 'Card erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Cards auswählen, um ihn zu löschen.',
      confirmTitle: 'Cards löschen?',
    },

    fields: {
      cardNo: 'Card No',
      isActive: 'Is Active',
      issueDate: 'Issue Date',
      deactivationDate: 'Deactivation Date',
      customer: 'Customer',
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
    label: 'Products',

    dashboardCard: {
      title: 'Products',
    },

    list: {
      menu: 'Products',
      title: 'Products',
      noResults: 'Keine products gefunden.',
    },

    export: {
      success: 'Products erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Product',
    },

    new: {
      menu: 'Neuer Product',
      title: 'Neuer Product',
      success: 'Product erfolgreich erstellt',
    },

    edit: {
      menu: 'Products bearbeiten',
      title: 'Products bearbeiten',
      success: 'Product erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Product(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Products auswählen, um ihn zu löschen.',
      confirmTitle: 'Product(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Products löschen möchten?',
    },

    destroy: {
      success: 'Product erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Products auswählen, um ihn zu löschen.',
      confirmTitle: 'Products löschen?',
    },

    fields: {
      name: 'Name',
      price: 'Price',
      receipts: 'Receipts',
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
    label: 'Devices',

    dashboardCard: {
      title: 'Devices',
    },

    list: {
      menu: 'Devices',
      title: 'Devices',
      noResults: 'Keine devices gefunden.',
    },

    export: {
      success: 'Devices erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Device',
    },

    new: {
      menu: 'Neuer Device',
      title: 'Neuer Device',
      success: 'Device erfolgreich erstellt',
    },

    edit: {
      menu: 'Devices bearbeiten',
      title: 'Devices bearbeiten',
      success: 'Device erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Device(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Devices auswählen, um ihn zu löschen.',
      confirmTitle: 'Device(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Devices löschen möchten?',
    },

    destroy: {
      success: 'Device erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Devices auswählen, um ihn zu löschen.',
      confirmTitle: 'Devices löschen?',
    },

    fields: {
      deviceId: 'Device Id',
      description: 'Description',
      station: 'Station',
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
    label: 'Vouchers',

    dashboardCard: {
      title: 'Vouchers',
    },

    list: {
      menu: 'Vouchers',
      title: 'Vouchers',
      noResults: 'Keine vouchers gefunden.',
    },

    export: {
      success: 'Vouchers erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Voucher',
    },

    new: {
      menu: 'Neuer Voucher',
      title: 'Neuer Voucher',
      success: 'Voucher erfolgreich erstellt',
    },

    edit: {
      menu: 'Vouchers bearbeiten',
      title: 'Vouchers bearbeiten',
      success: 'Voucher erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Voucher(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Vouchers auswählen, um ihn zu löschen.',
      confirmTitle: 'Voucher(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Vouchers löschen möchten?',
    },

    destroy: {
      success: 'Voucher erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Vouchers auswählen, um ihn zu löschen.',
      confirmTitle: 'Vouchers löschen?',
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
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
    label: 'Material Receipts',

    dashboardCard: {
      title: 'Material Receipts',
    },

    list: {
      menu: 'Material Receipts',
      title: 'Material Receipts',
      noResults: 'Keine material receipts gefunden.',
    },

    export: {
      success: 'Material Receipts erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Material Receipt',
    },

    new: {
      menu: 'Neuer Material Receipt',
      title: 'Neuer Material Receipt',
      success: 'Material Receipt erfolgreich erstellt',
    },

    edit: {
      menu: 'Material Receipts bearbeiten',
      title: 'Material Receipts bearbeiten',
      success: 'Material Receipt erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Material Receipt(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Material Receipts auswählen, um ihn zu löschen.',
      confirmTitle: 'Material Receipt(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Material Receipts löschen möchten?',
    },

    destroy: {
      success: 'Material Receipt erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Material Receipts auswählen, um ihn zu löschen.',
      confirmTitle: 'Material Receipts löschen?',
    },

    fields: {
      date1: 'Date',
      supplier: 'Supplier',
      quantity: 'Quantity',
      price: 'Price',
      total: 'Total',
      product: 'Product',
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
    label: 'Ranks',

    dashboardCard: {
      title: 'Ranks',
    },

    list: {
      menu: 'Ranks',
      title: 'Ranks',
      noResults: 'Keine ranks gefunden.',
    },

    export: {
      success: 'Ranks erfolgreich exportiert',
    },

    view: {
      title: 'Ansehen Rank',
    },

    new: {
      menu: 'Neuer Rank',
      title: 'Neuer Rank',
      success: 'Rank erfolgreich erstellt',
    },

    edit: {
      menu: 'Ranks bearbeiten',
      title: 'Ranks bearbeiten',
      success: 'Rank erfolgreich aktualisiert',
    },

    destroyMany: {
      success: 'Rank(n) erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Ranks auswählen, um ihn zu löschen.',
      confirmTitle: 'Rank(n) löschen?',
      confirmDescription:
        'Sind Sie sicher, dass Sie die {0} ausgewählten Ranks löschen möchten?',
    },

    destroy: {
      success: 'Rank erfolgreich gelöscht',
      noSelection:
        'Sie müssen mindestens einen Ranks auswählen, um ihn zu löschen.',
      confirmTitle: 'Ranks löschen?',
    },

    fields: {
      name: 'Name',
      description: 'Description',
      customers: 'Customers',
      createdByMembership: 'Erstellt von',
      updatedByMembership: 'Aktualisiert von',
      createdAt: 'Erstellt am',
      updatedAt: 'Aktualisiert am',
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
      menu: 'Prüfprotokolle',
      title: 'Prüfprotokolle',
      noResults: 'Keine Prüfprotokolle gefunden.',
    },

    changesDialog: {
      title: 'Prüfprotokoll',
      changes: 'Änderungen',
      noChanges: 'In diesem Protokoll gibt es keine Änderungen.',
    },

    export: {
      success: 'Prüfprotokolle erfolgreich exportiert',
    },

    fields: {
      timestamp: 'Datum',
      entityName: 'Entität',
      entityNames: 'Entitäten',
      entityId: 'Entitäts-ID',
      operation: 'Vorgang',
      operations: 'Vorgänge',
      membership: 'Benutzer',
      apiKey: 'API-Schlüssel',
      apiEndpoint: 'API-Endpunkt',
      apiHttpResponseCode: 'API-Status',
      transactionId: 'Transaktions-ID',
    },

    enumerators: {
      operation: {
        SI: 'Anmeldung',
        SO: 'Abmeldung',
        SU: 'Registrierung',
        PRR: 'Passwortzurücksetzung angefordert',
        PRC: 'Passwortzurücksetzung bestätigt',
        PC: 'Passwort geändert',
        VER: 'E-Mail-Überprüfung angefordert',
        VEC: 'E-Mail bestätigt',
        C: 'Erstellen',
        U: 'Aktualisieren',
        D: 'Löschen',
        AG: 'API Abruf',
        APO: 'API Post',
        APU: 'API Put',
        AD: 'API Löschen',
      },
    },

    dashboardCard: {
      activityChart: 'Aktivität',
      activityList: 'Kürzliche Aktivitäten',
    },

    readableOperations: {
      SI: '{0} hat sich angemeldet',
      SU: '{0} hat sich registriert',
      PRR: '{0} hat eine Passwortzurücksetzung angefordert',
      PRC: '{0} hat die Passwortzurücksetzung bestätigt',
      PC: '{0} hat das Passwort geändert',
      VER: '{0} hat eine E-Mail-Überprüfung angefordert',
      VEC: '{0} hat die E-Mail bestätigt',
      C: '{0} hat {1} {2} erstellt',
      U: '{0} hat {1} {2} aktualisiert',
      D: '{0} hat {1} {2} gelöscht',
    },
  },

  recaptcha: {
    errors: {
      disabled:
        'reCAPTCHA ist auf dieser Plattform deaktiviert. Überprüfung wird übersprungen.',
      invalid: 'Ungültiges reCAPTCHA',
    },
  },

  emails: {
    passwordResetEmail: {
      subject: `Setzen Sie Ihr Passwort für {0} zurück`,
      content: `<p>Hallo,</p> <p>Folgen Sie diesem Link, um Ihr Passwort für {0} zurückzusetzen.</p> <p><a href="{1}">{1}</a></p> <p>Wenn Sie nicht darum gebeten haben, Ihr Passwort zurückzusetzen, können Sie diese E-Mail ignorieren.</p> <p>Danke,</p> <p>Ihr {0} Team</p>`,
    },
    verifyEmailEmail: {
      subject: `Bestätigen Sie Ihre E-Mail für {0}`,
      content: `<p>Hallo,</p><p>Folgen Sie diesem Link, um Ihre E-Mail-Adresse zu bestätigen.</p><p><a href="{1}">{1}</a></p><p>Wenn Sie nicht darum gebeten haben, diese Adresse zu bestätigen, können Sie diese E-Mail ignorieren.</p> <p>Danke,</p> <p>Ihr {0} Team</p>`,
    },
    invitationEmail: {
      singleTenant: {
        subject: `Sie wurden zu {0} eingeladen`,
        content: `<p>Hallo,</p> <p>Sie wurden zu {0} eingeladen.</p> <p>Folgen Sie diesem Link zur Registrierung.</p> <p><a href="{1}">{1}</a></p> <p>Danke,</p> <p>Ihr {0} Team</p>`,
      },
      multiTenant: {
        subject: `Sie wurden zu {1} bei {0} eingeladen`,
        content: `<p>Hallo,</p> <p>Sie wurden zu {2} eingeladen.</p> <p>Folgen Sie diesem Link zur Registrierung.</p> <p><a href="{1}">{1}</a></p> <p>Danke,</p> <p>Ihr {0} Team</p>`,
      },
    },
    errors: {
      emailNotConfigured: 'E-Mail ENV-Variablen fehlen',
    },
  },
};

export default dictionary;
