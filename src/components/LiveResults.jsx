import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CORMORANT = '"Cormorant Garamond", serif';
const JOST      = '"Jost", sans-serif';
const API_BASE  = import.meta.env.VITE_API_URL || '';

const teams = [
  'CADD CENTRE Ksd',
  'Dreamzone Mng',
  'Dreamzone Ksd',
  'Synergy Ksd',
  'Livewire Ksd',
];

const emptyScores = Object.fromEntries(teams.map(t => [t, '']));

const events = [
  { id: 'speech', title: 'Speech', short: 'Speech' },
  { id: 'memory-challenge', title: 'Memory Challenge', short: 'Memory<br/>Challenge' },
  { id: 'quiz', title: 'Quiz', short: 'Quiz' },
  { id: 'ramp-walk', title: 'Ramp Walk', short: 'Ramp<br/>Walk' },
  { id: 'mehendi', title: 'Mehendi', short: 'Mehendi' },
  { id: 'musical-chair', title: 'Musical Chair', short: 'Musical<br/>Chair' },
  { id: 'lemon-spoon', title: 'Lemon & Spoon', short: 'Lemon &<br/>Spoon' },
  { id: 'solo-dance', title: 'Single Dance', short: 'Single<br/>Dance' },
  { id: 'solo-song', title: 'Single Song', short: 'Single<br/>Song' },
  { id: 'uno', title: 'UNO', short: 'UNO' },
  { id: 'face-painting', title: 'Face Painting', short: 'Face<br/>Painting' },
  { id: 'chess', title: 'Chess', short: 'Chess' },
  { id: 'group-song', title: 'Group Song', short: 'Group<br/>Song' },
  { id: 'group-dance', title: 'Group Dance', short: 'Group<br/>Dance' },
  { id: 'reel-challenge', title: 'Reel Challenge', short: 'Reel<br/>Challenge' },
];

const initialResults = events.map(event => ({
  id: event.id,
  title: event.title,
  scores: { ...emptyScores },
}));

function ScoreInput({ value, onChange, onFocus, onBlur, onKeyDown }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <input
      type="number"
      min="0"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus && onFocus(e);
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur && onBlur(e);
      }}
      onKeyDown={onKeyDown}
      placeholder="0"
      className="w-full min-w-0 bg-transparent text-center py-1 outline-none transition-all duration-200"
      style={{
        fontFamily: CORMORANT,
        fontWeight: 600,
        fontSize: '1.2rem',
        color: isFocused ? '#ffb347' : '#FFF7F7',
        background: isFocused ? 'rgba(255,179,71,0.12)' : 'transparent',
        borderRadius: '4px',
        WebkitAppearance: 'none',
        MozAppearance: 'textfield',
      }}
    />
  );
}

export default function LiveResults() {
  const [results, setResults] = useState(initialResults);
  const originalScore = useRef({ eventId: '', team: '', value: '' });

  // Mobile Update Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDept, setModalDept] = useState('');
  const [modalEvent, setModalEvent] = useState('');
  const [modalScore, setModalScore] = useState('');

  const openUpdateModal = (deptName) => {
    setModalDept(deptName);
    setModalEvent(events[0].id);
    const currentScore = results.find(r => r.id === events[0].id)?.scores[deptName] ?? '';
    setModalScore(currentScore);
    setIsModalOpen(true);
  };

  const handleModalDeptChange = (newDept) => {
    setModalDept(newDept);
    const currentScore = results.find(r => r.id === modalEvent)?.scores[newDept] ?? '';
    setModalScore(currentScore);
  };

  const handleModalEventChange = (newEventId) => {
    setModalEvent(newEventId);
    const currentScore = results.find(r => r.id === newEventId)?.scores[modalDept] ?? '';
    setModalScore(currentScore);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    const originalVal = results.find(r => r.id === modalEvent)?.scores[modalDept] ?? '';
    if (originalVal === modalScore) {
      setIsModalOpen(false);
      return;
    }

    const password = window.prompt(`Enter admin password to update score for ${modalDept} in ${results.find(r => r.id === modalEvent)?.title || modalEvent}:`);
    if (password === null) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/results/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: modalEvent, team: modalDept, value: modalScore, password })
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message || 'Update failed');
      } else {
        const data = await res.json();
        setResults(data);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      alert('Network error updating score');
    }
  };

  // Fetch results from backend on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/results`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setResults(data);
        }
      })
      .catch(err => console.error('Error fetching results:', err));
  }, []);

  const handleScoreChange = (eventId, team, value) => {
    setResults(prev =>
      prev.map(evt =>
        evt.id === eventId
          ? { ...evt, scores: { ...evt.scores, [team]: value } }
          : evt
      )
    );
  };

  const handleFocus = (eventId, team, currentVal) => {
    originalScore.current = { eventId, team, value: currentVal };
  };

  const handleBlur = async (eventId, team, currentVal) => {
    const prev = originalScore.current;
    if (prev.eventId === eventId && prev.team === team && prev.value !== currentVal) {
      const password = window.prompt(`Enter admin password to update score for ${team} in ${results.find(r => r.id === eventId)?.title || eventId}:`);
      if (password === null) {
        revertScore(eventId, team, prev.value);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/results/update`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId, team, value: currentVal, password })
        });

        if (!res.ok) {
          const errData = await res.json();
          alert(errData.message || 'Update failed');
          revertScore(eventId, team, prev.value);
        } else {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error(err);
        alert('Network error updating score');
        revertScore(eventId, team, prev.value);
      }
    }
  };

  const revertScore = (eventId, team, oldVal) => {
    setResults(prev =>
      prev.map(evt =>
        evt.id === eventId
          ? { ...evt, scores: { ...evt.scores, [team]: oldVal } }
          : evt
      )
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  // Compute per-event totals for each department
  const eventTotals = events.map(event => {
    const eventObj = results.find(r => r.id === event.id);
    const total = eventObj ? teams.reduce((sum, team) => sum + (parseFloat(eventObj.scores[team]) || 0), 0) : 0;
    return {
      eventId: event.id,
      eventTitle: event.title,
      total,
    };
  });

  // Compute per-department totals across all events
  const departmentTotals = teams.map(team => ({
    department: team,
    total: results.reduce((sum, evt) => sum + (parseFloat(evt.scores[team]) || 0), 0),
  }));

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden" style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #2a0516 0%, #1a020d 40%, #0e0108 100%)' }}>
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,77,141,0.7) 25%, rgba(255,106,61,0.8) 50%, rgba(255,179,71,0.7) 75%, transparent)',
          boxShadow: '0 0 20px rgba(255,77,141,0.4)',
        }}
      />

      {/* Ambient glow orbs - smaller on mobile */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/4 right-0 w-[200px] md:w-[450px] h-[200px] md:h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,179,71,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-1/4 left-0 w-[200px] md:w-[450px] h-[200px] md:h-[450px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,77,141,0.18) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 w-full px-2 sm:px-4 lg:px-6 py-6 sm:py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          {/* Live badge */}
          <div className="flex justify-center items-center gap-2 mb-2">
            <span
              className="text-[0.6rem] sm:text-[0.65rem]"
              style={{
                fontFamily: JOST,
                fontWeight: 600,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#ffb347',
                filter: 'drop-shadow(0 0 6px rgba(255,179,71,0.5))'
              }}
            >
              ✦ &nbsp; Live Results &nbsp; ✦
            </span>
          </div>

          {/* ArtX Logo */}
          <div className="flex justify-center mb-1">
            <Link to="/">
              <img
                src="/logo.png"
                alt="ArtX'26"
                className="cursor-pointer transition-transform hover:scale-[1.02] duration-300"
                style={{
                  width: 'clamp(160px, 22vw, 320px)',
                  height: 'auto',
                  mixBlendMode: 'screen',
                  filter: 'drop-shadow(0 0 18px rgba(255,77,141,0.55)) drop-shadow(0 0 40px rgba(255,106,61,0.35))',
                }}
              />
            </Link>
          </div>

          {/* Results label */}
          <p
            style={{
              fontFamily: JOST,
              fontWeight: 700,
              fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: '#F6C453',
              filter: 'drop-shadow(0 0 8px rgba(246,196,83,0.5))',
              marginTop: '0.25rem',
            }}
          >
            Results
          </p>
        </div>

        {/* Department vs Events table (Desktop view) */}
        <div className="hidden md:block relative overflow-hidden" style={{ borderRadius: '1rem' }}>
          <div className="relative p-3 sm:p-5">
            <div className="w-full" style={{ transform: 'translateZ(0)' }}>
              <table className="w-full border-separate border-spacing-0" style={{ tableLayout: 'fixed' }}>
                {/* Header row */}
                <thead>
                  <tr>
                    {/* Department column – wider */}
                    <th
                      className="py-3 px-2 text-left"
                      style={{
                        fontFamily: JOST,
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#ffb347',
                        background: '#0e0108',
                        borderBottom: '2px solid rgba(255,179,71,0.4)',
                        borderRight: '1px solid rgba(255,179,71,0.25)',
                        whiteSpace: 'nowrap',
                        width: '13%',
                      }}
                    >
                      Department
                    </th>
                    {/* Event columns – equal width sharing remaining 80% */}
                    {events.map((event) => (
                      <th
                        key={event.id}
                        className="py-3 px-0 text-center"
                        style={{
                          fontFamily: JOST,
                          fontWeight: 700,
                          fontSize: '0.6rem',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          color: '#ffb347',
                          background: 'rgba(255,179,71,0.12)',
                          borderBottom: '2px solid rgba(255,179,71,0.4)',
                          borderLeft: '1px solid rgba(255,179,71,0.15)',
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                          lineHeight: 1.25,
                        }}
                      >
                        <span dangerouslySetInnerHTML={{ __html: event.short }} />
                      </th>
                    ))}
                    {/* Overall column */}
                    <th
                      className="py-3 px-1 text-center"
                      style={{
                        fontFamily: JOST,
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#ff4d8d',
                        background: 'rgba(255,77,141,0.12)',
                        borderBottom: '2px solid rgba(255,77,141,0.5)',
                        borderLeft: '1px solid rgba(255,77,141,0.2)',
                        whiteSpace: 'nowrap',
                        width: '5%',
                      }}
                    >
                      Total
                    </th>
                  </tr>
                </thead>

                {/* Department rows */}
                <tbody>
                  {teams.map((department, deptIndex) => {
                    const deptTotal = results.reduce((sum, evt) => sum + (parseFloat(evt.scores[department]) || 0), 0);
                    return (
                      <tr
                        key={department}
                        style={{
                          background: deptIndex % 2 === 0 ? 'rgba(14,1,8,0.85)' : 'rgba(14,1,8,0.7)',
                        }}
                      >
                        <td
                          className="px-3 py-3 font-semibold sticky left-0 z-10"
                          style={{
                            fontFamily: JOST,
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            color: '#F6C453',
                            background: '#0e0108',
                            borderBottom: '1px solid rgba(255,179,71,0.15)',
                            borderRight: '1px solid rgba(255,179,71,0.15)',
                            whiteSpace: 'nowrap',
                            textTransform: 'uppercase',
                          }}
                        >
                          {department}
                        </td>
                        {events.map((event) => {
                          const eventVal = results.find(r => r.id === event.id)?.scores[department] ?? '';
                          return (
                            <td
                              key={`${department}-${event.id}`}
                              className="px-1 py-2 text-center"
                              style={{
                                borderBottom: '1px solid rgba(255,179,71,0.15)',
                                borderLeft: '1px solid rgba(255,179,71,0.08)',
                                background: 'rgba(255,179,71,0.03)',
                              }}
                            >
                              <ScoreInput
                                value={eventVal}
                                onChange={(v) => handleScoreChange(event.id, department, v)}
                                onFocus={() => handleFocus(event.id, department, eventVal)}
                                onBlur={() => handleBlur(event.id, department, eventVal)}
                                onKeyDown={handleKeyDown}
                              />
                            </td>
                          );
                        })}
                        <td
                          className="px-3 py-3 font-bold text-center"
                          style={{
                            fontFamily: CORMORANT,
                            fontWeight: 700,
                            fontSize: '1.6rem',
                            color: '#F6C453',
                            textShadow: '0 0 8px rgba(255,179,71,0.5)',
                            background: 'rgba(255,77,141,0.08)',
                            borderBottom: '1px solid rgba(255,77,141,0.25)',
                            borderLeft: '1px solid rgba(255,77,141,0.2)',
                          }}
                        >
                          {deptTotal}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Show each event separately (Mobile view) */}
      <div className="block md:hidden mt-8 px-4 space-y-6">
        {/* Overall Standings / Leaderboard card */}
        <div
          className="relative p-6 rounded-xl border border-white/15"
          style={{
            background: 'linear-gradient(135deg, rgba(255,77,141,0.05) 0%, rgba(255,179,71,0.05) 100%), rgba(14,1,8,0.85)',
            backdropFilter: 'blur(24px)'
          }}
        >
          <h2
            className="text-xl font-bold mb-1 text-center"
            style={{
              fontFamily: CORMORANT,
              background: 'linear-gradient(135deg, #F6C453 0%, #ff6a3d 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Overall Standings
          </h2>
          <p className="text-[9px] text-center text-white/40 tracking-widest uppercase mb-4" style={{ fontFamily: JOST }}>
            Tap a department to update scores
          </p>
          <div className="space-y-3">
            {[...departmentTotals]
              .sort((a, b) => b.total - a.total)
              .map((dept, index) => {
                const isLeader = index === 0 && dept.total > 0;
                return (
                  <div
                    key={dept.department}
                    className="flex justify-between items-center p-3 rounded-lg border cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors"
                    onClick={() => openUpdateModal(dept.department)}
                    style={{
                      background: isLeader ? 'rgba(246,196,83,0.08)' : 'rgba(255,255,255,0.02)',
                      borderColor: isLeader ? 'rgba(246,196,83,0.3)' : 'rgba(255,255,255,0.05)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white/40 w-5">#{index + 1}</span>
                      <span
                        className="font-semibold text-sm"
                        style={{ fontFamily: JOST, color: isLeader ? '#F6C453' : '#E8D9DD', textTransform: 'uppercase' }}
                      >
                        {dept.department}
                      </span>
                    </div>
                    <span
                      className="font-bold text-lg"
                      style={{
                        fontFamily: CORMORANT,
                        color: isLeader ? '#F6C453' : '#ff4d8d'
                      }}
                    >
                      {dept.total}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Event-wise cards */}
        {events.map((event) => (
          <div
            key={event.id}
            className="relative p-5 rounded-xl border border-white/10"
            style={{ background: 'rgba(14,1,8,0.75)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-lg font-semibold"
                style={{
                  fontFamily: CORMORANT,
                  color: '#F6C453',
                  fontSize: '1.2rem',
                }}
              >
                {event.title}
              </h2>
              <span className="text-[10px] text-white/30 tracking-wider uppercase font-medium" style={{ fontFamily: JOST }}>
                Tap to edit
              </span>
            </div>
            <div className="space-y-3">
              {teams
                .filter(team => {
                  const scoreVal = parseFloat(results.find(r => r.id === event.id)?.scores[team]) || 0;
                  return scoreVal > 0;
                })
                .map((team) => {
                  const scoreVal = results.find(r => r.id === event.id)?.scores[team] ?? '';
                  return (
                    <div
                      key={team}
                      className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors"
                      onClick={() => {
                        setModalDept(team);
                        setModalEvent(event.id);
                        setModalScore(scoreVal);
                        setIsModalOpen(true);
                      }}
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}
                    >
                      <span
                        className="font-medium text-sm"
                        style={{ fontFamily: JOST, color: '#E8D9DD', textTransform: 'uppercase' }}
                      >
                        {team}
                      </span>
                      <div className="w-16 text-center font-semibold text-[#E8D9DD] text-base" style={{ fontFamily: CORMORANT }}>
                        {scoreVal || '0'}
                      </div>
                    </div>
                  );
                })}
              {teams.filter(team => (parseFloat(results.find(r => r.id === event.id)?.scores[team]) || 0) > 0).length === 0 && (
                <div className="text-center py-2 text-xs text-[#BFAFB4] italic">
                  No scores recorded yet
                </div>
              )}
              <div
                className="pt-3 flex justify-between items-center border-t border-white/10"
                style={{ fontFamily: JOST, fontSize: '0.85rem' }}
              >
                <span style={{ color: '#ffb347' }}>Event Total</span>
                <div
                  className="w-16 text-center font-bold text-lg"
                  style={{ color: '#ff4d8d', fontFamily: CORMORANT, lineHeight: 1 }}
                >
                  {eventTotals.find(e => e.eventId === event.id)?.total ?? 0}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Score Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(25, 4, 15, 0.95) 0%, rgba(14, 1, 8, 0.98) 100%)',
                backdropFilter: 'blur(28px)',
              }}
            >
              {/* Background glow orb inside modal */}
              <div
                className="absolute -top-24 -left-24 w-48 h-48 rounded-full pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, #ff4d8d 0%, transparent 70%)', filter: 'blur(30px)' }}
              />

              <h3
                className="text-xl font-bold mb-6 text-center"
                style={{
                  fontFamily: CORMORANT,
                  background: 'linear-gradient(135deg, #F6C453 0%, #ff6a3d 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Update Score
              </h3>

              <form onSubmit={handleModalSubmit} className="space-y-5 relative z-10">
                {/* Department Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#ffb347] uppercase tracking-wider" style={{ fontFamily: JOST }}>
                    Department
                  </label>
                  <select
                    value={modalDept}
                    onChange={(e) => handleModalDeptChange(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-pink/50 transition-colors uppercase font-medium"
                    style={{ fontFamily: JOST }}
                  >
                    {teams.map((t) => (
                      <option key={t} value={t} className="bg-[#0e0108] text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Event Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#ffb347] uppercase tracking-wider" style={{ fontFamily: JOST }}>
                    Event
                  </label>
                  <select
                    value={modalEvent}
                    onChange={(e) => handleModalEventChange(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-pink/50 transition-colors font-medium"
                    style={{ fontFamily: JOST }}
                  >
                    {events.map((e) => (
                      <option key={e.id} value={e.id} className="bg-[#0e0108] text-white">
                        {e.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Score Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#ffb347] uppercase tracking-wider" style={{ fontFamily: JOST }}>
                    Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={modalScore}
                    onChange={(e) => setModalScore(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 text-white rounded-lg px-3 py-2 text-center text-lg font-bold outline-none focus:border-accent-pink/50 transition-colors"
                    style={{ fontFamily: CORMORANT }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    style={{ fontFamily: JOST }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-accent-pink to-accent-orange text-white rounded-full py-2.5 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-accent-pink/20"
                    style={{
                      fontFamily: JOST,
                      background: 'linear-gradient(135deg, #ff4d8d, #ff6a3d)',
                    }}
                  >
                    Update
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
