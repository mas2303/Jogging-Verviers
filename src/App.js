import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  MapPin,
  Trophy,
  Calendar,
  Zap,
  ChevronRight,
  CheckCircle,
  Clock,
  Activity,
  RotateCcw,
  Mountain,
  Wind,
  Flame,
} from "lucide-react";

// --- DATA: PROGRAMME COMPLET 24 SEMAINES (Janvier -> Juin) ---
const trainingPlan = [
  // --- PHASE 1 : FONDATIONS (HIVER) ---
  {
    week: 1,
    title: "Reprise en douceur",
    desc: "Phase 1 : Fondations. On réhabitue le corps.",
    sessions: [
      {
        id: "w1s1",
        day: "Mardi",
        type: "Endurance",
        duration: "40 min",
        content: "Footing très cool, aisance respiratoire totale",
        done: false,
      },
      {
        id: "w1s2",
        day: "Jeudi",
        type: "Renfo",
        duration: "30 min",
        content: "20' footing + 10' gainage (planche)",
        done: false,
      },
      {
        id: "w1s3",
        day: "Dimanche",
        type: "Longue",
        duration: "50 min",
        content: "Sortie à plat, allure papotage",
        done: false,
      },
    ],
  },
  {
    week: 2,
    title: "Augmentation durée",
    desc: "On ajoute 5 minutes partout. Facile.",
    sessions: [
      {
        id: "w2s1",
        day: "Mardi",
        type: "Endurance",
        duration: "45 min",
        content: "Footing cool",
        done: false,
      },
      {
        id: "w2s2",
        day: "Jeudi",
        type: "Renfo",
        duration: "35 min",
        content: "20' footing + 15' squats et fentes",
        done: false,
      },
      {
        id: "w2s3",
        day: "Dimanche",
        type: "Longue",
        duration: "55 min",
        content: "Sortie à plat, régulier",
        done: false,
      },
    ],
  },
  {
    week: 3,
    title: "Premières accélérations",
    desc: "On introduit un peu de rythme.",
    sessions: [
      {
        id: "w3s1",
        day: "Mardi",
        type: "Fartlek",
        duration: "45 min",
        content: "20' cool + 6x(1' vite / 1' lent) + recup",
        done: false,
      },
      {
        id: "w3s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "45 min",
        content: "Footing de récupération",
        done: false,
      },
      {
        id: "w3s3",
        day: "Dimanche",
        type: "Longue",
        duration: "1h00",
        content: "Le cap de l'heure !",
        done: false,
      },
    ],
  },
  {
    week: 4,
    title: "Semaine de régénération",
    desc: "On souffle un peu pour assimiler.",
    sessions: [
      {
        id: "w4s1",
        day: "Mardi",
        type: "Cool",
        duration: "30 min",
        content: "Juste tourner les jambes",
        done: false,
      },
      {
        id: "w4s2",
        day: "Jeudi",
        type: "Repos",
        duration: "0 min",
        content: "Repos ou natation cool",
        done: false,
      },
      {
        id: "w4s3",
        day: "Dimanche",
        type: "Longue",
        duration: "45 min",
        content: "Sortie plaisir sans chrono",
        done: false,
      },
    ],
  },
  {
    week: 5,
    title: "Volume 2.0",
    desc: "On reprend sérieux.",
    sessions: [
      {
        id: "w5s1",
        day: "Mardi",
        type: "Fartlek",
        duration: "50 min",
        content: "20' cool + 8x(1' vite / 1' lent) + recup",
        done: false,
      },
      {
        id: "w5s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "50 min",
        content: "Footing stable",
        done: false,
      },
      {
        id: "w5s3",
        day: "Dimanche",
        type: "Longue",
        duration: "1h05",
        content: "Sortie longue tranquille",
        done: false,
      },
    ],
  },
  {
    week: 6,
    title: "Rythme soutenu",
    desc: "On travaille le souffle.",
    sessions: [
      {
        id: "w6s1",
        day: "Mardi",
        type: "Seuil",
        duration: "50 min",
        content: "20' cool + 2 x 8min allure soutenue",
        done: false,
      },
      {
        id: "w6s2",
        day: "Jeudi",
        type: "Renfo",
        duration: "40 min",
        content: "30' footing + escaliers",
        done: false,
      },
      {
        id: "w6s3",
        day: "Dimanche",
        type: "Longue",
        duration: "1h10",
        content: "Endurance fondamentale",
        done: false,
      },
    ],
  },
  {
    week: 7,
    title: "Gros Volume",
    desc: "La plus grosse semaine de l'hiver.",
    sessions: [
      {
        id: "w7s1",
        day: "Mardi",
        type: "Seuil",
        duration: "55 min",
        content: "20' cool + 3 x 6min allure soutenue",
        done: false,
      },
      {
        id: "w7s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "50 min",
        content: "Footing cool",
        done: false,
      },
      {
        id: "w7s3",
        day: "Dimanche",
        type: "Longue",
        duration: "1h15",
        content: "Longue sortie",
        done: false,
      },
    ],
  },
  {
    week: 8,
    title: "Repos Hivernal",
    desc: "Fin de la phase 1. Repos.",
    sessions: [
      {
        id: "w8s1",
        day: "Mardi",
        type: "Cool",
        duration: "30 min",
        content: "Footing léger",
        done: false,
      },
      {
        id: "w8s2",
        day: "Jeudi",
        type: "Repos",
        duration: "0 min",
        content: "Repos complet",
        done: false,
      },
      {
        id: "w8s3",
        day: "Dimanche",
        type: "Sortie",
        duration: "45 min",
        content: "Sortie nature sans forcer",
        done: false,
      },
    ],
  },

  // --- PHASE 2 : FORCE & CÔTES (PRINTEMPS) ---
  {
    week: 9,
    title: "Bienvenue en Enfer",
    desc: "Phase 2 : Côtes. Verviers ça grimpe.",
    sessions: [
      {
        id: "w9s1",
        day: "Mardi",
        type: "Côtes",
        duration: "45 min",
        content: "20' cool + 8x30sec en côte rapide",
        done: false,
      },
      {
        id: "w9s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "45 min",
        content: "Récupération à plat",
        done: false,
      },
      {
        id: "w9s3",
        day: "Dimanche",
        type: "Vallonné",
        duration: "1h00",
        content: "Chercher les bosses sur le parcours",
        done: false,
      },
    ],
  },
  {
    week: 10,
    title: "Cuisses en béton",
    desc: "On insiste sur le dénivelé.",
    sessions: [
      {
        id: "w10s1",
        day: "Mardi",
        type: "Côtes",
        duration: "50 min",
        content: "20' cool + 10x30sec en côte",
        done: false,
      },
      {
        id: "w10s2",
        day: "Jeudi",
        type: "Renfo",
        duration: "40 min",
        content: "30' footing + squats sautés",
        done: false,
      },
      {
        id: "w10s3",
        day: "Dimanche",
        type: "Vallonné",
        duration: "1h10",
        content: "Sortie longue avec dénivelé",
        done: false,
      },
    ],
  },
  {
    week: 11,
    title: "Côtes Longues",
    desc: "On allonge l'effort en montée.",
    sessions: [
      {
        id: "w11s1",
        day: "Mardi",
        type: "Côtes",
        duration: "55 min",
        content: "20' cool + 5 x 1min30 en côte régulière",
        done: false,
      },
      {
        id: "w11s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "50 min",
        content: "Footing souple",
        done: false,
      },
      {
        id: "w11s3",
        day: "Dimanche",
        type: "Vallonné",
        duration: "1h15",
        content: "Rando-course active",
        done: false,
      },
    ],
  },
  {
    week: 12,
    title: "Repos Relatif",
    desc: "On digère le travail de côte.",
    sessions: [
      {
        id: "w12s1",
        day: "Mardi",
        type: "Fartlek",
        duration: "40 min",
        content: "Jeu d'allure sur le plat",
        done: false,
      },
      {
        id: "w12s2",
        day: "Jeudi",
        type: "Repos",
        duration: "0 min",
        content: "Repos",
        done: false,
      },
      {
        id: "w12s3",
        day: "Dimanche",
        type: "Cool",
        duration: "50 min",
        content: "Sortie plate",
        done: false,
      },
    ],
  },
  {
    week: 13,
    title: "Force Max",
    desc: "Dernier gros bloc de côtes.",
    sessions: [
      {
        id: "w13s1",
        day: "Mardi",
        type: "Côtes",
        duration: "55 min",
        content: "20' cool + 6 x 2min côte",
        done: false,
      },
      {
        id: "w13s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "50 min",
        content: "Footing cool",
        done: false,
      },
      {
        id: "w13s3",
        day: "Dimanche",
        type: "Vallonné",
        duration: "1h20",
        content: "Sortie longue bosselée",
        done: false,
      },
    ],
  },
  {
    week: 14,
    title: "Vitesse à plat",
    desc: "On transforme la force en vitesse.",
    sessions: [
      {
        id: "w14s1",
        day: "Mardi",
        type: "VMA",
        duration: "50 min",
        content: "20' cool + 10 x (30s vite / 30s lent)",
        done: false,
      },
      {
        id: "w14s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "50 min",
        content: "Footing récup",
        done: false,
      },
      {
        id: "w14s3",
        day: "Dimanche",
        type: "Longue",
        duration: "1h15",
        content: "Sortie avec 10min allure course",
        done: false,
      },
    ],
  },
  {
    week: 15,
    title: "Allure Course",
    desc: "On teste l'allure cible.",
    sessions: [
      {
        id: "w15s1",
        day: "Mardi",
        type: "Seuil",
        duration: "1h00",
        content: "20' cool + 3 x 8min allure 13km",
        done: false,
      },
      {
        id: "w15s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "50 min",
        content: "Footing cool",
        done: false,
      },
      {
        id: "w15s3",
        day: "Dimanche",
        type: "Longue",
        duration: "1h20",
        content: "Sortie longue (10-11km)",
        done: false,
      },
    ],
  },
  {
    week: 16,
    title: "Repos Printemps",
    desc: "Fin de la phase 2.",
    sessions: [
      {
        id: "w16s1",
        day: "Mardi",
        type: "Cool",
        duration: "35 min",
        content: "Footing léger",
        done: false,
      },
      {
        id: "w16s2",
        day: "Jeudi",
        type: "Repos",
        duration: "0 min",
        content: "Repos",
        done: false,
      },
      {
        id: "w16s3",
        day: "Dimanche",
        type: "Sortie",
        duration: "50 min",
        content: "Sortie plaisir",
        done: false,
      },
    ],
  },

  // --- PHASE 3 : PRÉ-COMPÉTITION (MAI-JUIN) ---
  {
    week: 17,
    title: "Vitesse Spécifique",
    desc: "Phase 3 : On prépare le moteur.",
    sessions: [
      {
        id: "w17s1",
        day: "Mardi",
        type: "VMA",
        duration: "55 min",
        content: "20' cool + 10 x (45s vite / 30s lent)",
        done: false,
      },
      {
        id: "w17s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "50 min",
        content: "Footing cool",
        done: false,
      },
      {
        id: "w17s3",
        day: "Dimanche",
        type: "Longue",
        duration: "1h15",
        content: "Sortie endurance",
        done: false,
      },
    ],
  },
  {
    week: 18,
    title: "Résistance",
    desc: "Tenir la vitesse longtemps.",
    sessions: [
      {
        id: "w18s1",
        day: "Mardi",
        type: "Pyramide",
        duration: "1h00",
        content: "2'-3'-4'-5'-4'-3'-2' allure course",
        done: false,
      },
      {
        id: "w18s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "50 min",
        content: "Footing récup",
        done: false,
      },
      {
        id: "w18s3",
        day: "Dimanche",
        type: "Longue",
        duration: "1h25",
        content: "Sortie longue (11-12km)",
        done: false,
      },
    ],
  },
  {
    week: 19,
    title: "Le Test",
    desc: "Grosse séance test.",
    sessions: [
      {
        id: "w19s1",
        day: "Mardi",
        type: "Seuil",
        duration: "1h00",
        content: "20' cool + 2 x 15min allure course",
        done: false,
      },
      {
        id: "w19s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "45 min",
        content: "Footing cool",
        done: false,
      },
      {
        id: "w19s3",
        day: "Dimanche",
        type: "Semi-Long",
        duration: "1h00",
        content: "Allure modérée",
        done: false,
      },
    ],
  },
  {
    week: 20,
    title: "Pic de Forme",
    desc: "Dernière semaine chargée.",
    sessions: [
      {
        id: "w20s1",
        day: "Mardi",
        type: "Vitesse",
        duration: "50 min",
        content: "20' cool + 12 x 200m rapides",
        done: false,
      },
      {
        id: "w20s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "50 min",
        content: "Footing cool",
        done: false,
      },
      {
        id: "w20s3",
        day: "Dimanche",
        type: "MAXI",
        duration: "1h30",
        content: "La sortie la plus longue (12-13km)",
        done: false,
      },
    ],
  },

  // --- PHASE 4 : AFFÛTAGE (JUIN) ---
  {
    week: 21,
    title: "Début Affûtage",
    desc: "On commence à réduire le volume.",
    sessions: [
      {
        id: "w21s1",
        day: "Mardi",
        type: "Rappel",
        duration: "45 min",
        content: "20' cool + 5 x 2min allure course",
        done: false,
      },
      {
        id: "w21s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "40 min",
        content: "Footing léger",
        done: false,
      },
      {
        id: "w21s3",
        day: "Dimanche",
        type: "Sortie",
        duration: "1h00",
        content: "Sortie cool, pas de fatigue",
        done: false,
      },
    ],
  },
  {
    week: 22,
    title: "Jusqu'au bout",
    desc: "On garde du jus.",
    sessions: [
      {
        id: "w22s1",
        day: "Mardi",
        type: "Vitesse",
        duration: "40 min",
        content: "20' cool + 8 lignes droites",
        done: false,
      },
      {
        id: "w22s2",
        day: "Jeudi",
        type: "Endurance",
        duration: "30 min",
        content: "Footing très cool",
        done: false,
      },
      {
        id: "w22s3",
        day: "Dimanche",
        type: "Sortie",
        duration: "45 min",
        content: "Sortie plaisir",
        done: false,
      },
    ],
  },
  {
    week: 23,
    title: "Fraîcheur",
    desc: "J-7 avant la course.",
    sessions: [
      {
        id: "w23s1",
        day: "Mardi",
        type: "Rappel",
        duration: "35 min",
        content: "20' cool + 1km allure course",
        done: false,
      },
      {
        id: "w23s2",
        day: "Jeudi",
        type: "Repos",
        duration: "0 min",
        content: "Repos",
        done: false,
      },
      {
        id: "w23s3",
        day: "Dimanche",
        type: "Cool",
        duration: "30 min",
        content: "Juste 30min pour s'aérer",
        done: false,
      },
    ],
  },
  {
    week: 24,
    title: "SEMAINE VERVIERS",
    desc: "C'est le grand moment.",
    sessions: [
      {
        id: "w24s1",
        day: "Mardi",
        type: "Reveil",
        duration: "20 min",
        content: "20min très lent + étirements",
        done: false,
      },
      {
        id: "w24s2",
        day: "Jeudi",
        type: "Repos",
        duration: "0 min",
        content: "Dormir, boire de l'eau, manger des pâtes",
        done: false,
      },
      {
        id: "w24s3",
        day: "Samedi",
        type: "RACE DAY",
        duration: "13 km",
        content: "JOGGING DE VERVIERS 20h00 !",
        done: false,
      },
    ],
  },
];

export default function VerviersPulse() {
  const [activeTab, setActiveTab] = useState("home");

  // MODIFICATION: Initialiser avec localStorage si dispo
  const [userPlan, setUserPlan] = useState(() => {
    // Essayer de récupérer le plan sauvegardé
    const savedPlan = localStorage.getItem("verviersPulseData");
    if (savedPlan) {
      return JSON.parse(savedPlan);
    }
    // Sinon retourner le plan par défaut
    return trainingPlan;
  });

  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true); // State pour l'écran de chargement

  // State pour le Timer
  const [timerActive, setTimerActive] = useState(false);
  const [time, setTime] = useState(0); // en secondes

  // State pour le décompte (Countdown)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Simulation d'un chargement initial (Splash Screen)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 secondes de chargement
    return () => clearTimeout(timer);
  }, []);

  // MODIFICATION : Sauvegarde automatique + Calcul progression
  useEffect(() => {
    // 1. Sauvegarder dans le téléphone
    localStorage.setItem("verviersPulseData", JSON.stringify(userPlan));

    // 2. Calculer la progression
    let count = 0;
    userPlan.forEach((week) => {
      week.sessions.forEach((session) => {
        if (session.done) count++;
      });
    });
    setCompletedCount(count);
  }, [userPlan]);

  // Logic pour le Countdown (Décompte)
  useEffect(() => {
    // Calcul dynamique de la prochaine date du "20 Juin"
    const now = new Date();
    let year = now.getFullYear();
    // Si on est après le 20 juin, on vise l'année suivante
    if (now.getMonth() > 5 || (now.getMonth() === 5 && now.getDate() > 20)) {
      year += 1;
    }
    // Si on est en 2025 et que Juin 2025 est passé, on vise 2026.
    // Pour la démo, on force au moins 2026 si nécessaire pour avoir un décompte positif.
    if (year < 2026 && now.getFullYear() >= 2025) {
      year = 2026;
    }

    const targetDate = new Date(`${year}-06-20T20:00:00`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!timerActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, time]);

  const toggleSession = (weekIndex, sessionIndex) => {
    const newPlan = [...userPlan];
    newPlan[weekIndex].sessions[sessionIndex].done =
      !newPlan[weekIndex].sessions[sessionIndex].done;
    setUserPlan(newPlan);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getProgressPercentage = () => {
    const totalSessions = userPlan.reduce(
      (acc, week) => acc + week.sessions.length,
      0
    );
    return Math.round((completedCount / totalSessions) * 100);
  };

  // NOUVEAU : Fonction pour déterminer le titre selon le nombre de séances
  // Ajusté pour 72 sessions totales (24 semaines)
  // On change de niveau environ toutes les 5 semaines (15 séances)
  const getLevelTitle = (count) => {
    if (count < 15) return "Débutant du Parc"; // Semaines 1 à 5
    if (count < 30) return "Rookie de la Vesdre"; // Semaines 6 à 10
    if (count < 45) return "Sprinteur de l'Harmonie"; // Semaines 11 à 15
    if (count < 60) return "Machine de Bielmont"; // Semaines 16 à 20
    return "Légende de Verviers"; // Semaines 21 à 24
  };

  // Calculer la progression dans le niveau ACTUEL (0-100%)
  const getLevelProgress = (count) => {
    if (count >= 60) return 100; // Niveau Max atteint
    const levelSize = 15;
    const currentLevelBase = Math.floor(count / levelSize) * levelSize;
    const progressInLevel = count - currentLevelBase;
    return Math.round((progressInLevel / levelSize) * 100);
  };

  const getPhaseIcon = (weekNum) => {
    if (weekNum <= 8) return <Wind size={16} className="text-blue-400" />;
    if (weekNum <= 16)
      return <Mountain size={16} className="text-orange-400" />;
    if (weekNum <= 21) return <Flame size={16} className="text-red-400" />;
    return <Trophy size={16} className="text-lime-400" />;
  };

  // --- RENDU DE L'ECRAN DE CHARGEMENT ---
  if (loading) {
    return (
      <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">
        {/* Cercles d'ambiance */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-lime-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="flex flex-col items-center z-10 animate-fade-in-up">
          <div className="bg-gradient-to-tr from-lime-400 to-green-300 p-6 rounded-3xl shadow-2xl shadow-lime-500/20 mb-6 transform hover:scale-105 transition-transform duration-500">
            <MapPin size={64} className="text-slate-900" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">
            Verviers Pulse
          </h1>
          <p className="text-slate-400 text-sm tracking-widest uppercase">
            Objectif Bielmont
          </p>

          <div className="mt-12 w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-lime-400 animate-progress origin-left"></div>
          </div>
        </div>

        {/* CSS pour les animations spécifiques au chargement */}
        <style>{`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-progress {
            animation: progress 2.5s ease-out forwards;
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // --- COMPOSANTS DE L'INTERFACE ---

  const HomeView = () => (
    <div className="space-y-6 pb-24 animate-fade-in">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-900 rounded-3xl p-6 text-white shadow-lg shadow-blue-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
          <MapPin size={120} />
        </div>
        <h2 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-1">
          Objectif
        </h2>
        <h1 className="text-3xl font-extrabold mb-1">Jogging de Verviers</h1>
        <div className="flex items-center space-x-2 text-blue-100 text-sm mb-4">
          <Calendar size={16} />
          <span>20 Juin • 13 KM</span>
        </div>

        {/* COUNTDOWN DISPLAY */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center border border-white/10">
            <span className="text-xl font-bold font-mono text-lime-400">
              {countdown.days}
            </span>
            <span className="text-[10px] uppercase text-blue-200">Jours</span>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center border border-white/10">
            <span className="text-xl font-bold font-mono text-white">
              {countdown.hours}
            </span>
            <span className="text-[10px] uppercase text-blue-200">Heures</span>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center border border-white/10">
            <span className="text-xl font-bold font-mono text-white">
              {countdown.minutes}
            </span>
            <span className="text-[10px] uppercase text-blue-200">Min</span>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 flex flex-col items-center border border-white/10">
            <span className="text-xl font-bold font-mono text-white">
              {countdown.seconds}
            </span>
            <span className="text-[10px] uppercase text-blue-200">Sec</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
          <div className="flex justify-between items-end mb-1">
            <span className="text-xs font-medium text-blue-100">
              Préparation
            </span>
            <span className="text-lg font-bold text-lime-400">
              {getProgressPercentage()}%
            </span>
          </div>
          <div className="w-full bg-blue-900/50 rounded-full h-1.5">
            <div
              className="bg-lime-400 h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Stats Rapides */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <div className="bg-orange-500/20 w-10 h-10 rounded-full flex items-center justify-center text-orange-400 mb-2">
            <Zap size={20} />
          </div>
          <div className="text-2xl font-bold text-white">{completedCount}</div>
          <div className="text-xs text-slate-400">Sessions terminées</div>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
          <div className="bg-purple-500/20 w-10 h-10 rounded-full flex items-center justify-center text-purple-400 mb-2">
            <Trophy size={20} />
          </div>
          {/* Calcul du niveau : augmente tous les 15 sessions terminées */}
          <div className="text-2xl font-bold text-white">
            Niveau {Math.min(5, Math.floor(completedCount / 15) + 1)}
          </div>
          <div className="text-xs text-lime-400 font-medium mb-2">
            {getLevelTitle(completedCount)}
          </div>

          {/* BARRE DE PROGRESSION DU NIVEAU */}
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div
              className="bg-purple-500 h-1.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getLevelProgress(completedCount)}%` }}
            ></div>
          </div>
          {completedCount < 60 && (
            <div className="text-[10px] text-slate-400 mt-1 text-right">
              {getLevelProgress(completedCount)}% vers le niv. suivant
            </div>
          )}
        </div>
      </div>

      {/* Prochaine Session */}
      <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
        <h3 className="text-white font-bold mb-4 flex items-center">
          <Activity className="mr-2 text-lime-400" size={18} />À faire cette
          semaine
        </h3>
        {userPlan
          .map((week, wIdx) =>
            week.sessions.map(
              (session, sIdx) =>
                !session.done && (
                  <div
                    key={`${wIdx}-${sIdx}`}
                    className="flex items-center justify-between bg-slate-700/50 p-3 rounded-xl mb-2 last:mb-0"
                  >
                    <div>
                      <div className="text-lime-400 text-[10px] font-bold uppercase mb-1 flex items-center gap-1">
                        {getPhaseIcon(week.week)} Semaine {week.week}
                      </div>
                      <div className="text-white font-semibold text-sm">
                        {session.day}
                      </div>
                      <div className="text-slate-400 text-xs">
                        {session.type} • {session.duration}
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab("run")}
                      className="bg-lime-400 hover:bg-lime-500 text-slate-900 p-2 rounded-lg font-bold text-xs transition-colors"
                    >
                      GO
                    </button>
                  </div>
                )
            )
          )
          .slice(0, 1)}{" "}
        {/* Only show the very next session */}
      </div>
    </div>
  );

  const PlanView = () => (
    <div className="space-y-6 pb-24">
      <h2 className="text-2xl font-bold text-white px-2">
        Ton Programme (24 Semaines)
      </h2>

      <div className="space-y-4">
        {userPlan.map((week, wIdx) => (
          <div
            key={wIdx}
            className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700"
          >
            <div className="bg-slate-700/50 p-4 border-b border-slate-700">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs font-mono bg-slate-900 px-1.5 py-0.5 rounded">
                    S{week.week}
                  </span>
                  <h3 className="text-lime-400 font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                    {getPhaseIcon(week.week)}
                    {week.week <= 8
                      ? "Base"
                      : week.week <= 16
                      ? "Côtes"
                      : week.week <= 21
                      ? "Vitesse"
                      : "Affûtage"}
                  </h3>
                </div>
                {week.sessions.every((s) => s.done) && (
                  <CheckCircle className="text-lime-400" size={18} />
                )}
              </div>
              <h4 className="text-white font-bold text-lg mt-1">
                {week.title}
              </h4>
              <p className="text-slate-400 text-xs mt-1">{week.desc}</p>
            </div>
            <div className="p-2">
              {week.sessions.map((session, sIdx) => (
                <div
                  key={sIdx}
                  onClick={() => toggleSession(wIdx, sIdx)}
                  className={`p-3 rounded-xl flex items-center justify-between mb-2 cursor-pointer transition-all ${
                    session.done
                      ? "bg-green-900/20 opacity-60"
                      : "hover:bg-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        session.done
                          ? "bg-lime-500 border-lime-500"
                          : "border-slate-500"
                      }`}
                    >
                      {session.done && (
                        <CheckCircle size={12} className="text-slate-900" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`font-medium text-sm ${
                          session.done
                            ? "text-slate-400 line-through"
                            : "text-white"
                        }`}
                      >
                        {session.day} - {session.type}
                      </div>
                      <div className="text-xs text-slate-500">
                        {session.content}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded">
                    {session.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const RunView = () => (
    <div className="flex flex-col h-full justify-between pb-24">
      <div className="text-center mt-8 space-y-2">
        <h2 className="text-slate-400 text-sm uppercase tracking-widest">
          Mode Course
        </h2>
        <div className="text-lime-400 font-medium">
          Objectif Verviers • 20 Juin
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Timer Circle */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full border-4 border-slate-700 ${
              timerActive ? "animate-pulse border-lime-500/30" : ""
            }`}
          ></div>
          <div className="text-6xl font-black text-white font-mono tracking-tighter">
            {formatTime(time)}
          </div>
          <div className="absolute bottom-16 text-slate-400 text-sm">
            Temps écoulé
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6 mt-8">
          <button
            onClick={() => {
              setTimerActive(false);
              setTime(0);
            }}
            className="w-14 h-14 rounded-full bg-slate-700 text-white flex items-center justify-center hover:bg-slate-600 transition-colors"
          >
            <RotateCcw size={24} />
          </button>

          <button
            onClick={() => setTimerActive(!timerActive)}
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transform transition-all active:scale-95 ${
              timerActive
                ? "bg-red-500 text-white shadow-red-500/30"
                : "bg-lime-400 text-slate-900 shadow-lime-400/30"
            }`}
          >
            {timerActive ? (
              <Pause size={40} fill="currentColor" />
            ) : (
              <Play size={40} fill="currentColor" className="ml-2" />
            )}
          </button>
        </div>
      </div>

      <div className="px-6 text-center">
        <p className="text-slate-500 text-xs italic">
          "La douleur est temporaire, la fierté d'avoir fini le jogging de
          Verviers est éternelle."
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-lime-400 selection:text-slate-900">
      <div className="max-w-md mx-auto min-h-screen relative flex flex-col bg-slate-900 shadow-2xl overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-grow p-5 overflow-y-auto scrollbar-hide">
          {activeTab === "home" && <HomeView />}
          {activeTab === "plan" && <PlanView />}
          {activeTab === "run" && <RunView />}
        </main>

        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-0 w-full max-w-md bg-slate-800/90 backdrop-blur-lg border-t border-slate-700/50 pb-safe pt-2 px-6">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center space-y-1 w-16 ${
                activeTab === "home"
                  ? "text-lime-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Activity size={24} strokeWidth={activeTab === "home" ? 3 : 2} />
              <span className="text-[10px] font-medium">Accueil</span>
            </button>

            <button
              onClick={() => setActiveTab("run")}
              className="relative -top-6 bg-gradient-to-tr from-lime-400 to-green-300 p-4 rounded-full shadow-lg shadow-lime-400/20 text-slate-900 transform transition-transform hover:scale-105 active:scale-95 border-4 border-slate-900"
            >
              <Clock size={28} strokeWidth={3} />
            </button>

            <button
              onClick={() => setActiveTab("plan")}
              className={`flex flex-col items-center space-y-1 w-16 ${
                activeTab === "plan"
                  ? "text-lime-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Calendar size={24} strokeWidth={activeTab === "plan" ? 3 : 2} />
              <span className="text-[10px] font-medium">Programme</span>
            </button>
          </div>
        </div>
      </div>

      {/* CSS for specialized styling (usually in Tailwind but added here for specific effects) */}
      <style>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
