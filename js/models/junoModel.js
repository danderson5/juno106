define([
    'backbone'
    ],
    
    function(Backbone) {
        return Backbone.Model.extend({
            
            defaults: function() {
                return {
                    'vca-level': 0.5,
                    'env-attack': 0,
                    'env-decay': 0,
                    'env-sustain': 1,
                    'env-release': 0,
                    'env-enabled': 1,
                    'dco-sawtooth': 1,
                    'dco-pulse': 0,
                    'dco-noise': 0,
                    'dco-pwm': 0,
                    'dco-range': 1,
                    'dco-sub': 0,
                    'dco-lfoPwmEnabled': 0,
                    'cho-chorusToggle': 0,
                    'vcf-cutoff': 1,
                    'vcf-res': 0,
                    'vcf-envMod': 0,
                    'vcf-invert': 1,
                    'vcf-keyFollow': 0,
                    'lfo-pitchMod': 0,
                    'lfo-rate': 0,
                    'lfo-delay': 0,
                    'lfo-freqMod': 0,
                    'hpf-cutoff': 0
                };
            },
            
            getOptions: function(frequency) {
                return {
                    frequency: this.getCurrentRange(frequency),
                    waveform: this.getCurrentWaveform(),
                    envelope: this.getCurrentEnvelope(),
                    vcfInverted: this.isFilterInverted(),
                    chorusLevel: this.get('cho-chorusToggle'),
                    lfoPwmEnabled: this.get('dco-lfoPwmEnabled'),
                    lfoRate: this.get('lfo-rate'),
                    lfoDelay: this.get('lfo-delay'),
                    lfoPitchMod: this.get('lfo-pitchMod'),
                    lfoFreqMod: this.get('lfo-freqMod'),
                    vcfFreq: this.get('vcf-cutoff'),
                    keyFollow: this.get('vcf-keyFollow'),
                    res: this.get('vcf-res'),
                    vcfEnv: this.get('vcf-envMod'),
                    volume: this.get('vca-level'),
                    hpf: this.get('hpf-cutoff'),
                };
            },
            
            getCurrentWaveform: function() {
                return {
                    sawtoothLevel: this.get('dco-sawtooth'),
                    pulseLevel: this.get('dco-pulse'),
                    noiseLevel: this.get('dco-noise'),
                    subLevel: this.get('dco-sub'),
                    pulseWidth: this.getPulseWidth()
                };
            },
            
            getCurrentRange: function(frequency) {
                var range = this.get('dco-range');
                
                if(range === 0) {
                    return frequency / 2;
                } else if(range === 2) {
                    return frequency * 2;
                }
                return frequency;
            },
            
            getCurrentEnvelope: function() {
                return {
                    enabled: this.get('env-enabled'),
                    attack: this.get('env-attack'),
                    decay: this.get('env-decay'),
                    sustain: this.get('env-sustain'),
                    release: this.get('env-release')
                };
            },
            
            getPulseWidth: function() {
                return this.get('dco-pwm') * 0.8;
            },
            
            isFilterInverted: function() {
                return !this.get('vcf-invert');
            },
            
            // Faders register 0.0775 at their lowest position, so convert that to 0
            get: function(attr) {
                var value = Backbone.Model.prototype.get.call(this, attr);
                return value > 0.0775 ? value : 0;
            }
            
        });
    });