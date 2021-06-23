#!/usr/bin/perl
# $Id: pmake,v 1.39 2021-05-21 18:35:44-07 - - $

$0 =~ s|.*/||;
use Getopt::Std;
use Data::Dumper;
use strict;
use warnings;

$Data::Dumper::Indent = 1;
$Data::Dumper::Sortkeys = 1;
$Data::Dumper::Terse = 1;
# dump_hash prints out the hashtable
sub dump_hash ($\%) {
   my ($label, $hashptr) = @_;
   print STDERR "%$label: ", Data::Dumper->Dump ([$hashptr]);
}

my $STATUS = 0;
END { exit $STATUS; }
$SIG{'__WARN__'} = sub { print STDERR @_; $STATUS = 1; };
$SIG{'__DIE__'} = sub { print STDERR @_; $STATUS = 1; exit; };

# sigtoperl: x86_64 Linux unix1.lt.ucsc.edu
# sigtoperl: Sun Nov 22 17:33:55 2020
my %strsignal = (
    0 => "Unknown signal 0",
    1 => "Hangup",
    2 => "Interrupt",
    3 => "Quit",
    4 => "Illegal instruction",
    5 => "Trace/breakpoint trap",
    6 => "Aborted",
    7 => "Bus error",
    8 => "Floating point exception",
    9 => "Killed",
   10 => "User defined signal 1",
   11 => "Segmentation fault",
   12 => "User defined signal 2",
   13 => "Broken pipe",
   14 => "Alarm clock",
   15 => "Terminated",
   16 => "Stack fault",
   17 => "Child exited",
   18 => "Continued",
   19 => "Stopped (signal)",
   20 => "Stopped",
   21 => "Stopped (tty input)",
   22 => "Stopped (tty output)",
   23 => "Urgent I/O condition",
   24 => "CPU time limit exceeded",
   25 => "File size limit exceeded",
   26 => "Virtual timer expired",
   27 => "Profiling timer expired",
   28 => "Window changed",
   29 => "I/O possible",
   30 => "Power failure",
   31 => "Bad system call",
);

# Whenever you detect a command in the Makefile, you can call
# run_command to execute that command and print the command itself.
# Need to modify this. pass in another parameter that indicates whether
# or not the print command should be executed (line 71)
# Or alternatively delete line 69 and inside of mkae_goal you can print the command
# returns undef if false or a string if true
sub run_command ($) {
   my ($command) = @_;
   # print "$command\n";
   # print "\t\tCOMMAND IM RUNNING IS", $command, "\n";
   # Grabs the status by passing command into system and gets back the 16 bit number
   my $status = eval {no warnings; system $command};

   # print("status is ", $status, "\n");
   # returns undefined if ran successsfully (would be 0)
   return undef unless $status;
   # otherwise returns error statement
   return "$!" if $status == -1;
   my $signal = $status & 0x7F;
   my $core = $status & 0x80;
   my $exit = ($status >> 8) & 0xFF;
   # print("we are here ", $signal, $core, $exit, "\n");
   # returns error exit when signal and core is 0
   return "Error $exit" unless $signal || $core;
   # getting the signal for the error code and get the appropriate
   # error message or else invalid signal.
   # core status code tells you if the core was dumped or not
   return ($strsignal{$signal} || "Invalid Signal Number $signal")
        . ($core ? " (core dumped)" : "");
}

# Variable
my $MAKECMDGOALS;
my $Makefile = "Makefile";
# The following are 3 graphs
# A set of flags
my %OPTIONS;
# The graph of dependencies
# Key: target name -> LINE -> Line number of definition, PREREQS
   # -> array of prereq strings, COMMANDS -> array of commands
my %GRAPH;
# The macros that have been defined
# Key: macro name -> LINE -> Line number of definition, VALUE
   # -> The macro assignment
my %MACROS;


sub usage() { die "Usage: $0 [-mgd] [target]\n" }
# Stops the Makefile immediately
sub stop($) { die "$Makefile:@_. Stop.\n" }

# sets the options graph, and makecmdgoals is argv[0] if it exists
# $MAKECMDGOALS is whats in command line after make like foo in $ make foo
sub scan_cmdline() {
   getopts "dgm", \%OPTIONS;
   usage unless @ARGV <= 1;
   $MAKECMDGOALS = $ARGV[0] if @ARGV == 1;
}

# for debugging to print out data at runtime
sub dump_graph() {
   print STDERR "%MACROS:\n";
   for my $macro (sort keys %MACROS) {
      printf STDERR "%7d [%s] = [%s]\n",
             $MACROS{$macro}{LINE}, $macro, $MACROS{$macro}{VALUE};
   }
   print STDERR "MAKECMDGOALS = [$MAKECMDGOALS]\n";
   print STDERR "%GRAPH:\n";
   for my $target (sort keys %GRAPH) {
      # $prereqs is a pointer to the array
      my $prereqs = $GRAPH{$target}{PREREQS};
      printf STDERR "%7d [%s] :", $GRAPH{$target}{LINE}, $target;
      print STDERR " [$_]" for @$prereqs;
      print STDERR "\n";
      for my $cmd (@{$GRAPH{$target}{COMMANDS}}) {
         printf STDERR "%7d.\t[%s]\n", $cmd->{LINE}, $cmd->{CMD};;
      }
   }
}

# the entirety of the parser which is already done for us
# Loads the graph and the macros hash tables
sub load_Makefile() {
   open my $mkfile, "<$Makefile" or die "$0: $Makefile: $!";
   my $target;
   while (defined (my $line = <$mkfile>)) {
      # If the line begins with a hash, we skip to the next line
      next if $line =~ m/^\s*(#|$)/;
      # If the target isnt there and the line matches exactly something with an equal
      # sign in it, then we have defined a macro
      if (!$target && $line =~ m/^\s*(\S+)\s*=\s*(.*?)\s*$/) {
         $MACROS{$1} = {LINE=> $., VALUE=> $2};
      }elsif ($line =~ m/^(\S+)\s*:\s*(.*)/) {
         # Otherwise if the line matches something with a colon in it, then
         # we set the target equal to the first token
         $target = $1;
         # Set up graph with the target, set its prereqs and line number
         # the split returns everything that is not whitespace in an array
         $GRAPH{$target}{PREREQS} = [split ' ', $2];
         $GRAPH{$target}{LINE} = $.;
         $MAKECMDGOALS = $target unless $MAKECMDGOALS;
      }elsif ($line =~ m/^\t(.*)/) {
         # Any lines that begin with a tab, we push onto the graph with a
         # particular target and the commands
         if (defined $target) {
            # push requires an array as its first arg like in x.perl
            push @{$GRAPH{$target}{COMMANDS}},
                 {LINE=> $., CMD=> $1};
         }else {
            stop "$.: Command before first target";
         }
      }else {
         stop "$.: Missing separator";
      }
   }
   close $mkfile;
}

# make_goal takes a target like foo or baz
# we start with a goal and GRAPH{goal} has 3 entries:
# {LINE}, @{PREREQS} which is an array, and @{COMMANDS} which is an array
# Works like BFS, goes thru each of the prereqs and recursively
# make_goal(@prereqs) and pass some visited list that can be updated in
# recursive call

# %VISITED
# make_goal(goal)
# GRAPH{goal}
#    if exists $VISITED{goal}
#       ...
#    $VISITED{goal} = 1
#    {LINE}
#    @{PREREQS}
#    @{COMMANDS}
#    foreach p in prereqs {
#          if GRAPH{p} is not null:
#             make_goal(@PREREQS, %VISITED)
#    }

# Pseudocode
# make_goal goal
#     if goal is not a target:
#         if goal is a file return its modtime
#         else stop with error "don't know how..."
#     else it is a target.

#     for each prereq:
#         call make_goal recursively with that prereq
#         remember the newest prereq modtime
#         if no prereqs, the newest modtime is 0

#     run the commands if either of the following is true:
#         the target file does not exist
#         or the newest prereq is newer than the target modtime

# running a command:
#     perform macro substitution on the command
#     if the command does not begin with "@", print it
#     call run_command
#     if run_command returns undef, return 
#     print the message:
#         if the command begins with "-" use (ignored), return
#         if not, print the message and exit 1


# Write function do_make
# do_make goal
#    if no goal in graph then its an error and call stop to quit program
#    Otherwise has a goal
#       then check does goal exist as a file
#          if not run commands
#          otherwise yes and check prereqs
#             any prereqs newer?
#                if yes run commands
#                if not do nothing

# make_goal is a recursive function. All of the following should occur inside of it
# Note do_make and make_goal are same function

# take a goal as an argument
# look up in graph if goal actually exists
# otherwise you stop
# if it has a goal then does it exist?
# if it does not exist as a file then you run the commands associated with that goal
# if does exist as a file then check if there are any prereqs (if none do nothing)
# if there are prereqs, check mod time of target in each prereq (need only one at a time)
   # write a loop which goes thru prereqs list
# if any prereq is newer than the target then set a flag saying need to run commands
# if target is newer than every prereq, then we failed to find a new prereq and do nothing

# to run a command, use the function run_command
   #returns undefined...YAY
   # else print error message returned from run_command

# other things to think of
   # @ suppress echo of command meaning if the first character of command
   # is an @ sign then when you call run_command you do not echo the command itself
   # - do not exit if an error meaning if the first character of the command is
   # a minus sign - and run_command returns a value, then you keep on going anyway

sub macro_substitution($) {
   my ($keyg) = @_;
   my $val = $keyg;
   # val is the value of the macro
   $val =~ s/\${(.*?)}/$MACROS{$1}{VALUE}/ge;
   print("VAL is ", $val, "\n");

   # Get the word out of the ${...} and then match it with one of
   # the macros. If the macro matches, then replace what's inside
   # the ${...} with the value of the macro (macro = value)

   # And then for each prereq and command, do the same but
   # add looking out for spaces. If the word is not a macro, then
   # just skip to the next word until reach end of (prereqs, an array)
   # and (command, a string)
}

sub modtime ($) {
   my ($filename) = @_;
   my @stat = stat $filename;
   # $stat[9] holds the modtime
   # return $stat[9];
   # if @stat is true then return $stat[9] else return undef
   return @stat ? $stat[9] : undef;
}

my @visited;
# newest time is prereq time variable
my $newptime = 0;
# newest time is target time variable
my $newttime = 0;

# forward declaration before writing the function
sub make_goal($);

sub make_goal($) {
   my ($goal) = @_;

   for my $keyGraph (sort keys %GRAPH) {
      if($keyGraph =~ m/\$\{([A-Z]+)\}/) {
         print("Macro in graph is ", $keyGraph, "\n");
         macro_substitution($keyGraph);
      }
      else {
         print("Key in graph is ", $keyGraph, "\n");
         last;
      }
   }

   # print("goal at top is ", $goal, "\n");
   # If the goal has already been visited, mark as visited
   if((scalar @visited) >= 1) {
      for my $v (@visited) {
         if($goal eq $v) {
            # print("goal inside is ", $goal, "\n");
            # print("v is ", $v, "\n");
            # print("goal has already been visited", "\n");
            return 0;
         }
      }
   }
   push(@visited, $goal);
   # print("visited is ", @visited, "\n");
   my $isGoalTarget = 0;
   my $target;
   for my $tg (sort keys %GRAPH) {
      # print("x is", $x, "\n");
      if($goal eq $tg) {
         $isGoalTarget = 1;
         $target = $tg;
         last;
      }
   }
   # print("target is ", $target, "\n");
   # print("goal is ", $goal, "\n");
   # if goal is not a target
   if($isGoalTarget == 0) {
      my $gtime = modtime($goal);
      if(defined($gtime)) {
         # print("goal ", $goal, " is not a target but is a file", "\n");
         return $gtime;
      }
      else {
         # print("goal ", $goal, " is not a target", "\n");
         print("No rule to make for ", $target, "\n");
         return 0;
      }
   }
   # if goal is a target
   if($isGoalTarget == 1) {
      # print("goal is a target", "\n");
      my $prereqs = $GRAPH{$goal}{PREREQS};
      # print("prereqs is ", @$prereqs, "\n");
      # print("prereqs[0] is ", @$prereqs[0], "\n");
      my @prereqtimes;
      my $ptime = 0;
      my $ttime = 0;
      for my $prq (@$prereqs) {
         # Check here if the prereqs are targets and if they
         # are, recursively call them
         # print("prereq is ", $prq, "\n");
         # if($prq eq $target) {
         #    print("prereq is a target!", "\n");
         #    make_goal($prq);
         # }
         my $isTarget = 0;
         for my $x (sort keys %GRAPH) {
            # print("x is", $x, "\n");
            if($prq eq $x) {
               $isTarget = 1;
               last;
            }
         }
         # Call modtime on each prereq and the target itself and check which
         # is newest time checking if target or prereq was modified sooner.
            # If there are no prereqs, the modtime for them is 0
         # if((scalar @$prereqs) == 0) {
         #    print("ptime is zero", "\n");
         #    $ptime = 0;
         # }
         # # otherwise there are prereqs so compute their modtime
         # else {
         #    print("ptime is not zero", "\n");
         #    $ptime = modtime($prq);
         # }
         $ptime = modtime($prq);
         if(!defined($ptime)) {
            $ptime = 0;
         }
         # print("goal here is ", $goal, "\n");
         # print("target here is ", $target, "\n");
         $ttime = modtime($target);
         if(!defined($ttime)) {
            $ttime = 0;
         }
         # print("targettime is ", $ttime, "\n");
         # If the target file exists
         # print("target is ", $target, " and target time is ", $ttime, "\n");
         # print("ptime is ", $ptime, "\n");
         # If the prerequisite is newer than the target
         # modtime, set the newesttime to be prereq time.
         if($ptime > $ttime) {
            $newptime = $ptime;
            # print("newesttime is ptime ", $newptime, "\n");
         }
         # If the target modtime is newer than the prerequisite,
         # then set the newest time to be target time.
         elsif ($ttime > $ptime) {
            $newttime = $ttime;
            # print("newesttime is targettime ", $newttime, "\n");
         }
         else {
            $ptime = 0;
            $ttime = 0;
         }

         # If prereq is a target, recurse to make prereq the goal
         if($isTarget == 1) {
            # print("prereq is a target! so recurse", "\n");
            make_goal($prq);
         }
            # stop "$.: Stopping here";
            # if one of prereqs was modified latest you run command
            # if target waas modified latest you dont run command
      }
      # If the newest prereq is newer than the target modtime, run the command.
      # If the target file does not exist, run the command.
      # Else if the target modtime is newer than the newest prereq, don't run the command.
      if(($newptime > $newttime) || ($ttime == 0)) {
         # my %cmd = @{$GRAPH{$goal}{COMMANDS}};
         my $cmd;
         my $rtcode = 0;
         for my $command (@{$GRAPH{$goal}{COMMANDS}}) {
            # printf STDERR "%7d.\t[%s]\n", $cmd->{LINE}, $cmd->{CMD};;
            $cmd = $command->{CMD};
            # store the cmd scalar in another variable
         }
         # before you print command here, check for the @ and - signs
         # have scalar to inidcate if @ or - and based on the scalar can have
         # if statement if sclar is 0, print and run command, if 1 just run command
         # print, runcommand, and then check the rtcode for error
         # print("Goal is ", $goal, "and Command is ", $cmd, "\n");
         # If the command does not begin with a ‘‘@’’, print it. Otherwise don't.

         if(defined $cmd) {
            # print("COMMAND BEFORE CMD IS ", $cmd, "\n");
            if(($cmd =~ m/^\@.*/) || ($cmd =~ m/^\-.*/)) {
               my $newStr = substr($cmd, 2);
               # print("New String is ", $newStr);
               if($cmd =~ m/^\-.*/) {
                  print($newStr, "\n");
               }
               $rtcode = run_command($newStr);
            }
            else {
               print($cmd, "\n");
               $rtcode = run_command($cmd);

            }

            if(defined $rtcode){
               if($cmd =~ m/^\-.*/) {
                  print("Ignored: Error ", $rtcode, "\n");
               }
               else {
                  # print("printing rtcode here", "\n");
                  print("Error file does not exist", "\n");
               }
            }
         }
         # else {
         #    print($rtcode, "\n");
         # }
         # print("For goal ", $goal, " and command ", $cmd, " and Rtcode is ", $rtcode, "\n");
         # return undef unless $rtcode;
         # If the rtcode is undef, then we can continue running the other commands
         # If the rtcode is defined, check if it starts with a "-" sign and if so,
         # print "ignored" and rest of error message. Otherwise just print error
         # message and exit 1.
         # if(defined $rtcode){
         #       print($rtcode, "\n");
         #       # exit(1);
         #       # print("would be exiting here", "\n");
         # }
         # else {
         #    next if(! defined $rtcode);
         # }
         # if the rtcode is undef, then the call was successful to run_command and can
         # proceed running the other commands
         # can have gloabl variable that checks if rtcode is 0
         # if rtcode is not undef, meaning an error, then print the error and die
         # if cmd begins with -, print message "ignore" and the rest of the error message

         # if you want to modify the array and have the changes reflected here,
         # then you would use \@cmds
         # my $str = join '', @cmds;
         # print("scalar cmds is ", $str, "\n");
         # print("cmd is ", %cmd->{CMD},  "\n");
         # my $res = run_command($str);
      }
      # loop over keys in graph and do macro substitution
   }

   # next if($goal ne $target);
   # return modtime($goal);
   # else {
   # # if goal is a file return its modtime
   # # else stop with error "don't know how..."
   #    print("I am here", "\n");
   #    return modtime($goal);
   # }
   # $prereqs is a pointer to the array
   # my $g = $GRAPH{$target};
   # my $prereqs = $GRAPH{$target}{PREREQS};
   # my $linenum = $GRAPH{$target}{LINE};
   # my $cmds = $GRAPH{$target}{COMMANDS};
   # # my @comds = keys @$cmds;
   # print("target is ", $target, "\n");
   # print("prereqs is ", @$prereqs, "\n");
   # print("linenum is ", $linenum, "\n");
   # print("cmds is ", @$cmds, "\n");
   # # print("comds is ", @comds, "\n");
   # print("g is ", $g, "\n");


   # %VISITED = 1;
}

scan_cmdline;
load_Makefile;

# string to match against in makefile using this regex expr
# that replaces the letters in parenths ()
# These have to be after load_Makefile bc otherwise the
# macros and graph table are empty until its loaded from makefile.
# Need to loop over the matches and replace them all instead of
# using the $MACROS{$1}{VALUE} part or maybe this will work
# $GRAPH{key}{COMMANDS}[some iterator here] =~ s/\$\{([A-Z]+)\}/$MACROS{$1}{VALUE}/g
# need to do the above for macros too
# $MACROS{key}{VALUE} =~ s/\$\{([A-Z]+)\}/$MACROS{$1}{VALUE}/g
# the .. would hold the key

# 11:23:45 =~ /(\d\d): (\d\d): (\d\d)/
# The first (\d\d) is $1, second is $2, and third is $3 (like variables)
# 11 will be assigned $1, 23 will be $2, and so on
# Example: aed = (a(e|f))(d)
# $1 = ae, $2 = e, $3 = d

# sort the keys of macros and the keys of graph by line number
# for loop over the sorted keys
# if $MACROS{key}  is not null
#    # function for macros
#    marcro_replace(key)
# if GRAPH{key} is not null
#    graph_replace()


dump_hash ("MACROS", %MACROS) if $OPTIONS{'m'};
dump_hash ("GRAPH", %GRAPH) if $OPTIONS{'g'};
dump_graph if $OPTIONS{'d'};


make_goal ($MAKECMDGOALS);

