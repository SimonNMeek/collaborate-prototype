import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Button, buttonVariants } from './components/ui/button';
import { Card } from './components/ui/card';
import { Badge, badgeVariants } from './components/ui/badge';
import { Avatar, AvatarFallback } from './components/ui/avatar';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ModernCollaborate() {
  const [activeHub, setActiveHub] = useState('product-launch');
  const [showCopilot, setShowCopilot] = useState(false);
  const [viewMode, setViewMode] = useState('overview');
  const [showArchived, setShowArchived] = useState(false);
  const [favoriteProjects, setFavoriteProjects] = useState(['product-launch', 'client-onboarding', 'team-handbook']);
  const [copilotQuery, setCopilotQuery] = useState('');
  const [copilotMessages, setCopilotMessages] = useState([]);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');

  const allProjects = [
    {
      id: 'product-launch',
      name: 'Q2 Product Launch',
      documents: 24,
      tasks: 8,
      members: [
        { name: 'Sarah Chen', initials: 'SC' },
        { name: 'Mike Rodriguez', initials: 'MR' },
        { name: 'Emma Wilson', initials: 'EW' }
      ],
      urgentItems: 2
    },
    {
      id: 'client-onboarding',
      name: 'TechCorp Onboarding',
      documents: 12,
      tasks: 5,
      members: [
        { name: 'David Kim', initials: 'DK' },
        { name: 'Lisa Park', initials: 'LP' }
      ],
      urgentItems: 1
    },
    {
      id: 'team-handbook',
      name: 'Team Handbook',
      documents: 18,
      tasks: 2,
      members: [
        { name: 'Alex Turner', initials: 'AT' }
      ],
      urgentItems: 0
    },
    {
      id: 'website-redesign',
      name: 'Website Redesign 2024',
      documents: 15,
      tasks: 12,
      members: [{ name: 'UI Team', initials: 'UI' }],
      urgentItems: 3
    }
  ];

  const archivedProjects = [
    { id: 'q1-launch', name: 'Q1 Product Launch' },
    { id: 'old-website', name: 'Website Migration' }
  ];

  const recentProjects = allProjects.filter(project => favoriteProjects.includes(project.id));
  const nonFavoriteProjects = allProjects.filter(project => !favoriteProjects.includes(project.id));
  const currentHub = allProjects.find(h => h.id === activeHub);

  const toggleFavorite = () => {
    if (favoriteProjects.includes(activeHub)) {
      setFavoriteProjects(favoriteProjects.filter(id => id !== activeHub));
    } else {
      setFavoriteProjects([...favoriteProjects, activeHub]);
    }
  };

  const isFavorite = favoriteProjects.includes(activeHub);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
        setCommandQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const documents = [
    {
      id: 1,
      name: 'Marketing Strategy Q2.docx',
      size: '2.4 MB',
      modifiedBy: 'Sarah Chen'
    },
    {
      id: 2,
      name: 'Budget_2024_Q2.xlsx',
      size: '1.8 MB',
      modifiedBy: 'Mike Rodriguez'
    }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Review pricing strategy',
      assignee: 'You',
      priority: 'high',
      dueDate: 'Today'
    },
    {
      id: 2,
      title: 'Approve marketing copy',
      assignee: 'Sarah Chen',
      priority: 'medium',
      dueDate: 'Tomorrow'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-600';
      case 'medium': return 'bg-orange-100 text-orange-600';
      default: return 'bg-green-100 text-green-600';
    }
  };

  // Copilot functionality
  const getCopilotResponse = (query) => {
    const responses = {
      "What's the status of our marketing materials?": "Your marketing materials are looking great! The Marketing Strategy Q2.docx was updated 2 hours ago by Sarah Chen. The pricing section needs final approval from you.",
      "Show me the budget breakdown for Q2 launch": "Based on Budget_2024_Q2.xlsx, your Q2 launch budget is $125k total. Marketing: $45k (36%), Development: $35k (28%), Operations: $25k (20%).",
      "Who needs to approve the pricing strategy?": "The pricing strategy is pending approval from you and the Finance Director. Sarah Chen has flagged this as high priority."
    };
    return responses[query] || "I can help you with questions about documents, tasks, team members, and project status.";
  };

  const handleSendMessage = (message) => {
    if (!message.trim()) return;
    
    const userMessage = { type: 'user', content: message, timestamp: 'Just now' };
    const aiResponse = { type: 'ai', content: getCopilotResponse(message), timestamp: 'Just now' };
    
    setCopilotMessages([...copilotMessages, userMessage, aiResponse]);
    setCopilotQuery('');
  };

  const handlePromptClick = (prompt) => {
    setCopilotQuery(prompt);
  };

  return (
    <>
      <style>{`
        :root {
          --background: 0 0% 100%;
          --foreground: 213 13% 14%;
          --card: 0 0% 100%;
          --primary: 180 100% 23%;
          --secondary: 180 58% 91%;
          --secondary-foreground: 180 100% 17%;
          --muted: 204 15% 94%;
          --muted-foreground: 207 6% 39%;
          --border: 213 14% 87%;
          --success-100: 133 37% 93%;
          --success-700: 142 100% 17%;
          --copilot-purple: #9F3767;
          --copilot-purple-50: #FFF1FD;
          --copilot-purple-200: #FFC8E0;
          --copilot-purple-700: #6E003E;
        }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .bg-copilot-50 { background-color: var(--copilot-purple-50); }
        .border-copilot-200 { border-color: var(--copilot-purple-200); }
        .text-copilot-700 { color: var(--copilot-purple-700); }
        
        /* Accessibility improvements */
        button:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 2px solid hsl(var(--primary));
          outline-offset: 2px;
        }
        
        .touch-target {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Screen reader only text */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
      
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <Icons.Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Collaborate</h1>
            </div>
          </div>
        </header>

        <div className="flex">
          <aside className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
            <div className="p-6">
              <div className="mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCommandPalette(true)}
                  className="w-full justify-start text-muted-foreground"
                >
                  <Icons.Search className="w-4 h-4 mr-2" />
                  Search everything...
                  <kbd className="ml-auto px-2 py-1 text-xs font-mono bg-muted rounded">⌘K</kbd>
                </Button>
              </div>

              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Icons.Heart className="w-4 h-4 text-red-500 fill-current" />
                  <h2 className="text-sm font-medium text-gray-500">Favourite Projects</h2>
                </div>
                <div className="space-y-2">
                  {recentProjects.map((hub) => (
                    <div
                      key={hub.id}
                      onClick={() => setActiveHub(hub.id)}
                      className={cn(
                        "p-4 rounded-lg border cursor-pointer transition-all duration-200",
                        activeHub === hub.id 
                          ? "bg-teal-50 border-teal-200 shadow-sm" 
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-gray-900">{hub.name}</span>
                        {hub.urgentItems > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {hub.urgentItems}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-2 text-xs text-gray-500">
                        <span>{hub.documents} docs</span>
                        <span>{hub.tasks} tasks</span>
                        <span>{hub.members.length} members</span>
                      </div>
                      
                      {activeHub === hub.id && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowCopilot(true);
                          }}
                          className="w-full text-xs h-7 bg-copilot-50 border-copilot-200 text-copilot-700"
                        >
                          Ask Copilot
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-500">All Projects</h3>
                  <button
                    onClick={() => setShowArchived(!showArchived)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showArchived ? 'Hide Archived' : 'Show Archived'}
                  </button>
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {!showArchived && nonFavoriteProjects.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => setActiveHub(project.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                        activeHub === project.id 
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {project.name}
                    </button>
                  ))}
                  
                  {showArchived && archivedProjects.map((project) => (
                    <button
                      key={project.id}
                      className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-md transition-colors flex items-center justify-between"
                    >
                      <span>{project.name}</span>
                      <Icons.Archive className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1 p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {currentHub?.name}
                  </h1>
                </div>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'overview' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('overview')}
                    className="text-xs"
                  >
                    Overview
                  </Button>
                  <Button
                    variant={viewMode === 'activity' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('activity')}
                    className="text-xs"
                  >
                    Activity
                  </Button>
                  <Button
                    variant={viewMode === 'comments' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('comments')}
                    className="text-xs"
                  >
                    Comments
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" size="sm" className="h-auto p-3 flex-col">
                    <Icons.Upload className="w-4 h-4 mb-1" />
                    <span className="text-xs">Upload</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto p-3 flex-col">
                    <Icons.Plus className="w-4 h-4 mb-1" />
                    <span className="text-xs">New Task</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto p-3 flex-col">
                    <Icons.Share className="w-4 h-4 mb-1" />
                    <span className="text-xs">Share</span>
                  </Button>
                </div>
              </div>

              {viewMode === 'overview' && (
                <div>
                  <Card className="p-6 mb-6 bg-gradient-to-br from-white to-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icons.BarChart3 className="w-4 h-4 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Project Overview</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={toggleFavorite}
                          className={cn(
                            "transition-colors touch-target",
                            isFavorite 
                              ? "text-red-500 hover:text-red-600" 
                              : "text-gray-400 hover:text-red-500"
                          )}
                          aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
                        >
                          <Icons.Heart className={cn("w-4 h-4 mr-1", isFavorite && "fill-current")} />
                          {isFavorite ? 'Favourited' : 'Add to Favourites'}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-500 hover:text-gray-700 touch-target"
                          aria-label="Archive this project"
                        >
                          <Icons.Archive className="w-4 h-4 mr-1" />
                          Archive
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-500 hover:text-gray-700 touch-target"
                          aria-label="Create a child site under this project"
                        >
                          <Icons.FolderPlus className="w-4 h-4 mr-1" />
                          Create Child Site
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <Icons.FileText className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold text-blue-700">{currentHub?.documents || 0}</div>
                        <div className="text-xs text-blue-600">Documents</div>
                      </div>
                      
                      <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                        <Icons.CheckSquare className="w-5 h-5 text-green-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold text-green-700">{currentHub?.tasks || 0}</div>
                        <div className="text-xs text-green-600">Tasks</div>
                      </div>
                      
                      <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                        <Icons.Users className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                        <div className="text-lg font-semibold text-purple-700">{currentHub?.members?.length || 0}</div>
                        <div className="text-xs text-purple-600">Members</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icons.Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">Last activity</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-5 h-5">
                            <AvatarFallback className="text-xs">SC</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-700">2 hours ago</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h2 className="font-semibold text-gray-900">Documents</h2>
                          <Button variant="secondary" size="sm">
                            <Icons.Upload className="w-4 h-4 mr-1" />
                            Upload
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          {documents.map((doc) => (
                            <div key={doc.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                              <Icons.FileText className="w-4 h-4 text-blue-600" />
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900 text-sm">{doc.name}</h3>
                                <p className="text-xs text-gray-500">{doc.size} • by {doc.modifiedBy}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>

                    <Card>
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h2 className="font-semibold text-gray-900">Tasks</h2>
                          <Button variant="secondary" size="sm">
                            <Icons.Plus className="w-4 h-4 mr-1" />
                            New Task
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-3">
                          {tasks.map((task) => (
                            <div key={task.id} className="p-3 border border-gray-200 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
                                <span className={cn("px-2 py-1 rounded-full text-xs", getPriorityColor(task.priority))}>
                                  {task.priority}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Assigned to {task.assignee}</span>
                                <span>Due {task.dueDate}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {viewMode === 'activity' && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Project Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 border-l-2 border-blue-200 bg-blue-50/30">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">SC</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm"><strong>Sarah Chen</strong> uploaded <strong>Marketing Strategy Q2.docx</strong></p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 border-l-2 border-green-200 bg-green-50/30">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">MR</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm"><strong>Mike Rodriguez</strong> completed task <strong>Review pricing strategy</strong></p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {viewMode === 'comments' && (
                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Project Comments</h2>
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <textarea
                          placeholder="Add a comment..."
                          className="w-full p-3 border border-gray-200 rounded-lg text-sm resize-none"
                          rows="3"
                        ></textarea>
                        <div className="flex justify-end mt-2">
                          <Button size="sm" className="bg-blue-600">
                            Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">SC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900 text-sm">Sarah Chen</span>
                          <span className="text-xs text-gray-500">3 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-700">Great progress on the launch materials!</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </main>

          {showCopilot && (
            <div className="w-80 bg-white border-l border-gray-200 h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <svg viewBox="0 0 225 181" className="w-5 h-5" fill="#9F3767">
                      <path d="M147.847 147.282C151.505 150.924 151.535 156.868 147.514 160.116C136.123 169.311 122.62 175.642 108.141 178.507C90.5922 181.981 72.3969 180.2 55.8614 173.386C39.326 166.572 25.1938 155.037 15.2514 140.237C5.30908 125.434 0 108.038 0 90.2352C0 72.4322 5.30908 55.0325 15.2514 40.2331C25.1938 25.4337 39.326 13.8983 55.8614 7.08461C72.3926 0.27092 88.0174 -2.02945 108.141 1.95544C124.789 5.25193 136.127 11.1552 147.514 20.3465C151.535 23.5895 151.509 29.5379 147.847 33.18L135.51 45.4505C131.848 49.0926 125.948 49.0128 121.712 46.0512C115.554 41.7454 108.53 38.7418 101.079 37.2673C90.5499 35.1838 79.6319 36.2508 69.7106 40.3381C59.7894 44.4255 51.3126 51.3484 45.3447 60.2289C39.3809 69.1094 36.1963 79.5484 36.1963 90.231C36.1963 100.914 39.3767 111.353 45.3447 120.233C51.3126 129.109 59.7894 136.032 69.7106 140.12C79.6319 144.211 90.5457 145.278 101.079 143.195C108.53 141.72 115.554 138.717 121.712 134.411C125.948 131.449 131.848 131.369 135.51 135.012L147.847 147.282Z" />
                      <path d="M138.957 96.9103C135.181 93.2472 135.181 87.2106 138.957 83.5517L174.84 48.7775C180.783 43.0224 190.759 47.2064 190.759 55.4568V71.5879H206.251C216.608 71.5879 225 79.9349 225 90.2352C225 100.536 216.608 108.883 206.251 108.883H190.759V125.005C190.759 133.256 180.783 137.44 174.84 131.685L138.957 96.9103Z" />
                      <path d="M90.4908 116.99C105.345 116.99 117.391 105.014 117.391 90.2352C117.391 75.4568 105.349 63.4761 90.4908 63.4761C75.6321 63.4761 63.5864 75.461 63.5864 90.2352C63.5864 105.009 75.6364 116.99 90.4908 116.99Z" />
                    </svg>
                    <h2 className="font-semibold text-gray-900">Copilot</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowCopilot(false)}>
                    <Icons.X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mb-4 p-3 bg-copilot-50 border border-copilot-200 rounded-lg">
                  <p className="text-xs text-copilot-700">
                    <Icons.Target className="w-3 h-3 inline mr-1" />
                    Focused on: <strong>{currentHub?.name}</strong>
                  </p>
                  <p className="text-xs text-copilot-700 mt-1">
                    {currentHub?.documents} documents • {currentHub?.tasks} tasks available
                  </p>
                </div>

                {copilotMessages.length > 0 && (
                  <div className="mb-6 space-y-3 max-h-64 overflow-y-auto">
                    {copilotMessages.map((message, index) => (
                      <div 
                        key={index} 
                        className={cn(
                          "p-3 rounded-lg",
                          message.type === 'user' ? "bg-blue-50 border border-blue-200 ml-4" : "bg-copilot-50 border border-copilot-200"
                        )}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          {message.type === 'ai' && (
                            <svg viewBox="0 0 225 181" className="w-3 h-3" fill="#9F3767">
                              <path d="M147.847 147.282C151.505 150.924 151.535 156.868 147.514 160.116C136.123 169.311 122.62 175.642 108.141 178.507C90.5922 181.981 72.3969 180.2 55.8614 173.386C39.326 166.572 25.1938 155.037 15.2514 140.237C5.30908 125.434 0 108.038 0 90.2352C0 72.4322 5.30908 55.0325 15.2514 40.2331C25.1938 25.4337 39.326 13.8983 55.8614 7.08461C72.3926 0.27092 88.0174 -2.02945 108.141 1.95544C124.789 5.25193 136.127 11.1552 147.514 20.3465C151.535 23.5895 151.509 29.5379 147.847 33.18L135.51 45.4505C131.848 49.0926 125.948 49.0128 121.712 46.0512C115.554 41.7454 108.53 38.7418 101.079 37.2673C90.5499 35.1838 79.6319 36.2508 69.7106 40.3381C59.7894 44.4255 51.3126 51.3484 45.3447 60.2289C39.3809 69.1094 36.1963 79.5484 36.1963 90.231C36.1963 100.914 39.3767 111.353 45.3447 120.233C51.3126 129.109 59.7894 136.032 69.7106 140.12C79.6319 144.211 90.5457 145.278 101.079 143.195C108.53 141.72 115.554 138.717 121.712 134.411C125.948 131.449 131.848 131.369 135.51 135.012L147.847 147.282Z" />
                              <path d="M138.957 96.9103C135.181 93.2472 135.181 87.2106 138.957 83.5517L174.84 48.7775C180.783 43.0224 190.759 47.2064 190.759 55.4568V71.5879H206.251C216.608 71.5879 225 79.9349 225 90.2352C225 100.536 216.608 108.883 206.251 108.883H190.759V125.005C190.759 133.256 180.783 137.44 174.84 131.685L138.957 96.9103Z" />
                              <path d="M90.4908 116.99C105.345 116.99 117.391 105.014 117.391 90.2352C117.391 75.4568 105.349 63.4761 90.4908 63.4761C75.6321 63.4761 63.5864 75.461 63.5864 90.2352C63.5864 105.009 75.6364 116.99 90.4908 116.99Z" />
                            </svg>
                          )}
                          <span className="text-xs font-medium">
                            {message.type === 'user' ? 'You' : 'Copilot'}
                          </span>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{message.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Try asking:</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => handlePromptClick("What's the status of our marketing materials?")}
                      className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-copilot-50 rounded-lg transition-colors border border-gray-200 hover:border-copilot-200"
                    >
                      "What's the status of our marketing materials?"
                    </button>
                    <button 
                      onClick={() => handlePromptClick("Show me the budget breakdown for Q2 launch")}
                      className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-copilot-50 rounded-lg transition-colors border border-gray-200 hover:border-copilot-200"
                    >
                      "Show me the budget breakdown for Q2 launch"
                    </button>
                    <button 
                      onClick={() => handlePromptClick("Who needs to approve the pricing strategy?")}
                      className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-copilot-50 rounded-lg transition-colors border border-gray-200 hover:border-copilot-200"
                    >
                      "Who needs to approve the pricing strategy?"
                    </button>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ask about this project..."
                      value={copilotQuery}
                      onChange={(e) => setCopilotQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage(copilotQuery);
                        }
                      }}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 bg-white touch-target"
                      aria-label="Ask Copilot about this project"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSendMessage(copilotQuery)}
                      className="absolute right-2 top-2 h-7 w-8 p-0 touch-target"
                      style={{ backgroundColor: '#9F3767' }}
                      aria-label="Send message to Copilot"
                    >
                      <Icons.Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showCommandPalette && (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-start justify-center pt-32 z-50">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-96 overflow-hidden">
                <div className="flex items-center px-4 py-4 border-b border-gray-200">
                  <Icons.Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search projects, documents, tasks..."
                    value={commandQuery}
                    onChange={(e) => setCommandQuery(e.target.value)}
                    className="flex-1 text-lg outline-none placeholder-gray-400"
                    autoFocus
                    aria-label="Search everything in Collaborate"
                  />
                  <button
                    onClick={() => setShowCommandPalette(false)}
                    className="ml-3 text-gray-400 hover:text-gray-600"
                  >
                    <Icons.X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-center text-gray-500">Search functionality ready</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
