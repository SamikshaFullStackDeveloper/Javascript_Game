  const words = [
            { word: "javascript", hint: "Programming language" },
            { word: "computer", hint: "Electronic device" },
            { word: "keyboard", hint: "Input device" },
            { word: "mountain", hint: "Natural elevation" },
            { word: "elephant", hint: "Large mammal" },
            { word: "rainbow", hint: "Colorful arc in sky" },
            { word: "guitar", hint: "Musical instrument" },
            { word: "butterfly", hint: "Flying insect" },
            { word: "chocolate", hint: "Sweet treat" },
            { word: "telescope", hint: "Star viewing tool" },
            { word: "pyramid", hint: "Ancient structure" },
            { word: "volcano", hint: "Erupting mountain" },
            { word: "orchestra", hint: "Musical ensemble" },
            { word: "diamond", hint: "Precious gem" },
            { word: "penguin", hint: "Antarctic bird" },
            { word: "sandwich", hint: "Food between bread" },
            { word: "universe", hint: "Everything that exists" },
            { word: "thunder", hint: "Sound after lightning" },
            { word: "calendar", hint: "Date tracker" },
            { word: "treasure", hint: "Hidden valuables" }
        ];

        let currentWord = {};
        let score = 0;
        let streak = 0;
        let correct = 0;
        let wrong = 0;

        function scrambleWord(word) {
            const arr = word.split('');
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr.join('');
        }

        function newWord() {
            currentWord = words[Math.floor(Math.random() * words.length)];
            let scrambled = scrambleWord(currentWord.word);
            
            // scrambled word is different from original
            while (scrambled === currentWord.word && currentWord.word.length > 3) {
                scrambled = scrambleWord(currentWord.word);
            }
            
            document.getElementById('scrambledWord').textContent = scrambled;
            document.getElementById('hint').textContent = `Hint: ${currentWord.hint}`;
            document.getElementById('userInput').value = '';
            document.getElementById('userInput').focus();
            hideMessage();
        }

        function scrambleCurrentWord() {
            let scrambled = scrambleWord(currentWord.word);
            while (scrambled === currentWord.word && currentWord.word.length > 3) {
                scrambled = scrambleWord(currentWord.word);
            }
            document.getElementById('scrambledWord').textContent = scrambled;
        }

        function checkAnswer() {
            const userAnswer = document.getElementById('userInput').value.toLowerCase().trim();
            
            if (!userAnswer) {
                return;
            }

            if (userAnswer === currentWord.word) {
                score += 10;
                streak++;
                correct++;
                showMessage('🎉 Correct! Well done!', 'correct');
                updateScore();
                setTimeout(newWord, 1500);
            } else {
                streak = 0;
                wrong++;
                showMessage(`❌ Wrong! The answer was: ${currentWord.word}`, 'wrong');
                updateScore();
                setTimeout(newWord, 2500);
            }
        }

        function skipWord() {
            streak = 0;
            showMessage(`Skipped! The answer was: ${currentWord.word}`, 'wrong');
            setTimeout(newWord, 2000);
        }

        function showMessage(text, type) {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            messageEl.className = `message show ${type}`;
        }

        function hideMessage() {
            const messageEl = document.getElementById('message');
            messageEl.className = 'message';
        }

        function updateScore() {
            document.getElementById('score').textContent = score;
            document.getElementById('streak').textContent = streak;
            document.getElementById('correct').textContent = correct;
            document.getElementById('wrong').textContent = wrong;
        }

        // Allow Enter key to check answer
        document.getElementById('userInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });

        // Initialize game
        newWord();