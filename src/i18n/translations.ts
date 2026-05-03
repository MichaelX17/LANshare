export const SUPPORTED_LOCALES = ["es-ES", "en"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export type Dictionary = {
  common: {
    files: string;
    recent: string;
    shared: string;
    settings: string;
    file: string;
    filePlural: string;
    size: string;
    date: string;
    actions: string;
    cancel: string;
    closeModal: string;
    uploadFile: string;
    deleteFile: string;
    uploadReady: string;
    uploadInProgress: string;
    prepared: string;
    chooseFile: string;
  };
  page: {
    serverBadge: string;
    heroTitle: string;
    heroDescription: string;
    networkStatus: string;
    networkState: string;
    transferEnabled: string;
  };
  header: {
    appName: string;
    allFiles: string;
    uploadShort: string;
    theme: string;
    changeThemeToLight: string;
    changeThemeToDark: string;
    changeLanguage: string;
    changeLanguageToSpanish: string;
    changeLanguageToEnglish: string;
  };
  sidebar: {
    localStorage: string;
    inText: string;
  };
  storageSummary: {
    title: string;
    documents: string;
    media: string;
    archives: string;
    others: string;
  };
  fileList: {
    loading: string;
    emptyTitle: string;
    emptyDescription: string;
    download: string;
    deleteAria: string;
    name: string;
  };
  uploadModal: {
    transferLabel: string;
    title: string;
    subtitle: string;
    dropHint: string;
    removeFile: string;
    fileTooLarge: string;
    fileTypeNotAllowed: string;
    uploadFailed: string;
    uploadNetworkError: string;
    uploadUnexpectedError: string;
    fileSelected: string;
    uploadingWithProgress: string;
  };
  deleteModal: {
    irreversible: string;
    title: string;
    subtitle: string;
    selectedFile: string;
    deleting: string;
    failed: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  "es-ES": {
    common: {
      files: "Archivos",
      recent: "Recientes",
      shared: "Compartidos",
      settings: "Ajustes",
      file: "Archivo",
      filePlural: "Archivos",
      size: "Tamano",
      date: "Fecha",
      actions: "Acciones",
      cancel: "Cancelar",
      closeModal: "Cerrar modal",
      uploadFile: "Subir archivo",
      deleteFile: "Eliminar archivo",
      uploadReady: "Listo para subir",
      uploadInProgress: "Subiendo archivo",
      prepared: "Preparado",
      chooseFile: "Elegir archivo",
    },
    page: {
      serverBadge: "Servidor local",
      heroTitle: "Tus archivos, cerca de ti",
      heroDescription: "Red local activa para compartir en segundos desde cualquier dispositivo de casa u oficina.",
      networkStatus: "Estado de red",
      networkState: "Activa y estable",
      transferEnabled: "Transferencia local habilitada",
    },
    header: {
      appName: "Local Server Storage",
      allFiles: "Todos",
      uploadShort: "Subir",
      theme: "Tema",
      changeThemeToLight: "Cambiar a tema claro",
      changeThemeToDark: "Cambiar a tema oscuro",
      changeLanguage: "Idioma",
      changeLanguageToSpanish: "Cambiar idioma a espanol",
      changeLanguageToEnglish: "Cambiar idioma a ingles",
    },
    sidebar: {
      localStorage: "Almacenamiento local",
      inText: "en",
    },
    storageSummary: {
      title: "Resumen de almacenamiento",
      documents: "Documentos",
      media: "Multimedia",
      archives: "Comprimidos",
      others: "Otros",
    },
    fileList: {
      loading: "Cargando archivos...",
      emptyTitle: "No hay archivos",
      emptyDescription: "Sube tu primer archivo usando el boton \"Subir archivo\"",
      download: "Descargar",
      deleteAria: "Eliminar",
      name: "Nombre",
    },
    uploadModal: {
      transferLabel: "Transferencia local",
      title: "Subir archivo",
      subtitle: "Arrastra un archivo o seleccionalo manualmente para compartirlo en tu red local.",
      dropHint: "Arrastra y suelta un archivo aqui o haz clic para seleccionarlo",
      removeFile: "Quitar archivo",
      fileTooLarge: "El archivo supera el limite de 100 MB.",
      fileTypeNotAllowed: "Tipo de archivo no permitido. Usa un formato comun de documento, imagen, audio, video o comprimido.",
      uploadFailed: "No se pudo subir el archivo. Intenta nuevamente.",
      uploadNetworkError: "Error de red al subir el archivo. Verifica tu conexion.",
      uploadUnexpectedError: "Ocurrio un error inesperado durante la carga.",
      fileSelected: "Archivo seleccionado",
      uploadingWithProgress: "Subiendo",
    },
    deleteModal: {
      irreversible: "Accion irreversible",
      title: "Eliminar archivo",
      subtitle: "Vas a eliminar este archivo de la carpeta compartida. Esta accion no se puede deshacer.",
      selectedFile: "Archivo seleccionado",
      deleting: "Eliminando...",
      failed: "No se pudo eliminar el archivo. Intenta nuevamente.",
    },
  },
  en: {
    common: {
      files: "Files",
      recent: "Recent",
      shared: "Shared",
      settings: "Settings",
      file: "File",
      filePlural: "Files",
      size: "Size",
      date: "Date",
      actions: "Actions",
      cancel: "Cancel",
      closeModal: "Close modal",
      uploadFile: "Upload file",
      deleteFile: "Delete file",
      uploadReady: "Ready to upload",
      uploadInProgress: "Uploading file",
      prepared: "Prepared",
      chooseFile: "Choose file",
    },
    page: {
      serverBadge: "Local server",
      heroTitle: "Your files, close to you",
      heroDescription: "Active local network to share in seconds from any device at home or office.",
      networkStatus: "Network status",
      networkState: "Active and stable",
      transferEnabled: "Local transfer enabled",
    },
    header: {
      appName: "Local Server Storage",
      allFiles: "All files",
      uploadShort: "Upload",
      theme: "Theme",
      changeThemeToLight: "Switch to light theme",
      changeThemeToDark: "Switch to dark theme",
      changeLanguage: "Language",
      changeLanguageToSpanish: "Switch language to Spanish",
      changeLanguageToEnglish: "Switch language to English",
    },
    sidebar: {
      localStorage: "Local storage",
      inText: "in",
    },
    storageSummary: {
      title: "Storage summary",
      documents: "Documents",
      media: "Media",
      archives: "Archives",
      others: "Others",
    },
    fileList: {
      loading: "Loading files...",
      emptyTitle: "No files yet",
      emptyDescription: "Upload your first file using the \"Upload file\" button",
      download: "Download",
      deleteAria: "Delete",
      name: "Name",
    },
    uploadModal: {
      transferLabel: "Local transfer",
      title: "Upload file",
      subtitle: "Drag and drop a file or select it manually to share it on your local network.",
      dropHint: "Drag and drop a file here or click to select",
      removeFile: "Remove file",
      fileTooLarge: "The file exceeds the 100 MB limit.",
      fileTypeNotAllowed: "File type not allowed. Use a common document, image, audio, video, or archive format.",
      uploadFailed: "Unable to upload file. Please try again.",
      uploadNetworkError: "Network error while uploading. Check your connection.",
      uploadUnexpectedError: "An unexpected upload error occurred.",
      fileSelected: "Selected file",
      uploadingWithProgress: "Uploading",
    },
    deleteModal: {
      irreversible: "Irreversible action",
      title: "Delete file",
      subtitle: "You are about to delete this file from the shared folder. This action cannot be undone.",
      selectedFile: "Selected file",
      deleting: "Deleting...",
      failed: "Unable to delete file. Please try again.",
    },
  },
};

export function isSupportedLocale(value: string | null | undefined): value is Locale {
  return value === "es-ES" || value === "en";
}

export function getFileTypeLabel(extension: string, locale: Locale): string {
  const ext = extension.toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
    return locale === "en" ? "Image" : "Imagen";
  }

  if (["pdf"].includes(ext)) {
    return locale === "en" ? "PDF document" : "Documento PDF";
  }

  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) {
    return locale === "en" ? "Archive" : "Comprimido";
  }

  if (["mp4", "mkv", "avi", "mov"].includes(ext)) {
    return locale === "en" ? "Video" : "Video";
  }

  if (["mp3", "wav", "aac", "flac"].includes(ext)) {
    return locale === "en" ? "Audio" : "Audio";
  }

  if (["doc", "docx"].includes(ext)) {
    return locale === "en" ? "Word document" : "Documento Word";
  }

  if (["xls", "xlsx"].includes(ext)) {
    return locale === "en" ? "Spreadsheet" : "Hoja de calculo";
  }

  if (["txt", "md", "csv"].includes(ext)) {
    return locale === "en" ? "Text" : "Texto";
  }

  return locale === "en" ? "File" : "Archivo";
}
