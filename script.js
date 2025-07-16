const malla = document.getElementById("malla");

const estructura = {
  "AÑO 1": {
    "SEMESTRE 1": [
      "Taller de Comunicación Oral y Escrita",
      "Matemática General",
      "Introducción a la Medicina Veterinaria",
      "Biología Celular",
      "Química"
    ],
    "SEMESTRE 2": [
      "Inglés I",
      "Bioestadística",
      "Anatomía del Canino",
      "Histoembriología",
      "Bioquímica"
    ]
  },
  "AÑO 2": {
    "SEMESTRE 3": [
      "Inglés II",
      "Medio Ambiente y Gestión Ambiental",
      "Anatomía Comparada",
      "Zoología",
      "Genética",
      "Práctica Básica"
    ],
    "SEMESTRE 4": [
      "Administración y Emprendimiento Veterinario",
      "Microbiología General y Veterinaria",
      "Fisiología Animal",
      "Enfermedades Parasitarias",
      "Tecnología de los Alimentos",
      "Nutrición y Alimentación Animal"
    ]
  },
  "AÑO 3": {
    "SEMESTRE 5": [
      "Reproducción e Inseminación Artificial",
      "Inmunología",
      "Fisiopatología",
      "Etología y Bienestar Animal",
      "Patología de Sistemas"
    ],
    "SEMESTRE 6": [
      "Obstetricia y Ginecología",
      "Control de Calidad de los Alimentos",
      "Producción Avícola",
      "Farmacología y Toxicología",
      "Enfermedades Infecciosas"
    ]
  },
  "AÑO 4": {
    "SEMESTRE 7": [
      "Laboratorio Clínico",
      "Producción Ovinos y Caprinos",
      "Producción Porcina",
      "Epidemiología Veterinaria",
      "Semiología"
    ],
    "SEMESTRE 8": [
      "Cirugía General",
      "Medicinas de Animales Mayores",
      "Medicina de Caninos",
      "Medicina de Felinos",
      "Medicina de Animales Exóticos",
      "Práctica Intermedia"
    ]
  },
  "AÑO 5": {
    "SEMESTRE 9": [
      "Formulación y Evaluación de Proyectos Agropecuarios",
      "Producción Acuícola",
      "Producción de Bovinos de Carne y Leche",
      "Patología Quirúrgica",
      "Diagnóstico por Imágenes",
      "Metodología de la Investigación"
    ],
    "SEMESTRE 10": [
      "Farmacología Aplicada",
      "Salud Pública",
      "Trabajo de Titulación",
      "Clínica de Animales Menores",
      "Clínica de Animales Mayores",
      "Práctica Final"
    ]
  }
};

const prerrequisitos = {
  "Inglés II": ["Inglés I"],
  "Anatomía Comparada": ["Anatomía del Canino"],
  "Bioquímica": ["Química"],
  "Fisiología Animal": ["Biología Celular"],
  "Fisiopatología": ["Fisiología Animal"],
  "Farmacología y Toxicología": ["Bioquímica"],
  "Enfermedades Infecciosas": ["Microbiología General y Veterinaria"],
  "Reproducción e Inseminación Artificial": ["Anatomía Comparada"],
  "Cirugía General": ["Fisiopatología"],
  "Clínica de Animales Menores": ["Medicina de Caninos", "Cirugía General"],
  "Clínica de Animales Mayores": ["Medicinas de Animales Mayores"],
  "Trabajo de Titulación": ["Metodología de la Investigación"],
  "Práctica Final": ["Práctica Intermedia"]
};

const aprobados = new Set();

function renderMalla() {
  malla.innerHTML = "";
  for (let año in estructura) {
    const divAño = document.createElement("div");
    divAño.className = "año";
    const h2 = document.createElement("h2");
    h2.textContent = año;
    divAño.appendChild(h2);

    for (let semestre in estructura[año]) {
      const divSem = document.createElement("div");
      divSem.className = "semestre";
      const h3 = document.createElement("h3");
      h3.textContent = semestre;
      divSem.appendChild(h3);

      estructura[año][semestre].forEach(ramo => {
        const divRamo = document.createElement("div");
        divRamo.className = "ramo";
        divRamo.textContent = ramo;
        divRamo.onclick = () => toggleRamo(ramo, divRamo);

        if (!puedeDesbloquear(ramo)) {
          divRamo.classList.add("bloqueado");
        }

        if (aprobados.has(ramo)) {
          divRamo.classList.add("aprobado");
        }

        divSem.appendChild(divRamo);
      });

      divAño.appendChild(divSem);
    }
    malla.appendChild(divAño);
  }
}

function toggleRamo(nombre, div) {
  if (div.classList.contains("bloqueado")) return;

  if (aprobados.has(nombre)) {
    aprobados.delete(nombre);
  } else {
    aprobados.add(nombre);
  }
  renderMalla();
}

function puedeDesbloquear(ramo) {
  if (!prerrequisitos[ramo]) return true;
  return prerrequisitos[ramo].every(req => aprobados.has(req));
}

renderMalla();
