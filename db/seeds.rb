# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    # puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    # User.destroy_all
  
    # puts "Resetting primary keys..."
    # # For easy testing, so that after seeding, the first `User` has `id` of 1
    # ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Seeding Users..."

    User.create(
      username: 'Quanta', 
      email: 'demo2@lol.lol', 
      password: 'emergent',
      dob: Date.new(2000)
    )

    User.create(
      username: 'Boolean', 
      email: 'demo1@lol.lol', 
      password: 'truefalse',
      dob: Date.new(1999)
    )

    User.create(
      id: 3,
      username: 'Sen.Dan.Inouye', 
      email: 'demo3@lol.lol', 
      password: 'cialying',
      dob: Date.new(1924,9,7)
    )

    User.create(
      id: 4,
      username: 'Sen.Ed.Kennedy',
      email: 'demo4@lol.lol',
      password: 'cialying',
      dob: Date.new(1932,2,22)
    )

    User.create(
      id: 5,
      username: 'Adm.Stan.Turner',
      email: 'demo5@lol.lol',
      password: 'ciatruth',
      dob: Date.new(1923,12,1)
    )

    User.create(
      id: 6,
      username: 'Pres.Jim.Carter',
      email: 'demo5@lol.lol',
      password: 'president',
      dob: Date.new(1924,10,1)
    )

    puts "Seeding Servers..."

    Server.create(
      title: 'U.S. SENATE,
      SELECT COMMITTEE ON INTELLIGENCE',
      owner_id: 3,
      id: 10
    )

    puts "Seeding Memberships..."

    Membership.create(
      user_id: 3,
      membershipable_type: "Server",
      membershipable_id: 10,
      accepted: true
    )

    Membership.create(
      user_id: 4,
      membershipable_type: "Server",
      membershipable_id: 10,
      accepted: true
    )

    Membership.create(
      user_id: 5,
      membershipable_type: "Server",
      membershipable_id: 10,
      accepted: true
    )

    Membership.create(
      user_id: 1,
      membershipable_type: "Server",
      membershipable_id: 10,
      accepted: true
    )

    Membership.create(
      user_id: 2,
      membershipable_type: "Server",
      membershipable_id: 10,
      accepted: true
    )

    puts "Seeding Channels..."

    Channel.create(
      title: 'SUBCOMITTEE ON HEALTH
      AND SCIENTIFIC RESEARCH',
      server_id: 10,
      id: 20,
      owner_id: 3
    )

    Channel.create(
      title: 'admiral-turner-statement',
      server_id: 10,
      id: 21,
      owner_id: 3
    )

    puts "Seeding Messages..."

    Message.create(
      author_id: 3,
      server_id: 10,
      channel_id: 20,
      body: 'The Senate Select Committee on Intelligence is
      meeting today and is joined by the Subcommittee on Health and
      Scientific Research chaired by Senator Edward Kennedy of Massachusetts and Senator Richard Schweiker of Pennsylvania. Senator
      Hathaway and Senator Chafee are members of both committees. We
      are to hear testimony from the Director of Central Intelligence, Adm.
      Stansfield Turner, and from other Agency witnesses on issues concerning new documents supplied to the committee in the last week on drug
      testing conducted by the Central Intelligence Agency.'
    )

    Message.create(
      author_id: 3,
      server_id: 10,
      channel_id: 20,
      body: 'It should be made clear from the outset that in general, we are
      focusing on events that happened over 12 or as long as 23 years ago.
      It should be emphasized that the programs that are of greatest concern have stopped and that we are reviewing these past events in
      order to better understand what statutes and other guidelines might be
      necessary to prevent the recurrence of such abuses in the future. We
      also need to know and understand what is now being done by the CIA
      in the field of behavioral research to be certain that no current abuses
      are occurring.'
    )

    Message.create(
      author_id: 3,
      server_id: 10,
      channel_id: 20,
      body: 'I want to commend Admiral Turner for his full cooperation with
      this committee and with the Subcommittee on Health in recognizing
      that this issue needed our attention. The CIA has assisted our committees and staffs in their investigative efforts and in arriving at
      remedies which will serve the best interests of our country.'  
    )

    Message.create(
      author_id: 3,
      server_id: 10,
      channel_id: 20,
      body: 'The reappearance of reports of the abuses of the drug testing program. and reports of other previously unknown drug programs and
      projects for behavioral control underline the necessity for effective
      oversight procedures both in the executive branch and in the Congress. The Select Committee on Intelligence has been working very
      closely with President Carter, the Vice President, and Admiral
      Turner and his associates in developing basic concepts for statutory
      guidelines which will govern all activities of the intelligence agencies
      of the United States.'  
    )

    Message.create(
      author_id: 3,
      server_id: 10,
      channel_id: 20,
      body: 'In fact, it is my expectation that the President will soon announce
      his decisions on how he has decided the intelligence agencies of the
      United States shall be organized. This committee will be working
      closely with the President and Admiral Turner in placing this new
      structure under the law and to develop effective oversight procedures.'  
    )
    
    Message.create(
      author_id: 3,
      server_id: 10,
      channel_id: 20,
      body: 'It is clear that effective oversight requires that information must
      be full and forthcoming. Full and timely information is obviously
      necessary if the committee and the public is to be confident that any
      transgressions can be dealt with quickly and forcefully.'  
    )

    Message.create(
      author_id: 3,
      server_id: 10,
      channel_id: 20,
      body: 'One purpose of this hearing is to give the committee and the public
      an understanding of what new information has been discovered that
      adds to the knowledge already available from previous Church and
      Kennedy inquiries, and to hear the reasons why these documents were
      not available to the Church and Kennedy committees. It is also the
      purpose of this hearing to address the issues raised by any additional
      illegal or improper activities that have emerged from the files and to
      develop remedies to prevent such improper activities from occurring
      again.'  
    )

    Message.create(
      author_id: 3,
      server_id: 10,
      channel_id: 20,
      body: 'Finally, there is an obligation on the part of both this committee
      and the CIA to make every effort to help those individuals or institutions that may have been harmed by any of these improper or illegal
      activities. I am certain that Admiral Turner will work with this committee to see that this will be done.'  
    )

    Message.create(
      author_id: 3,
      server_id: 10,
      channel_id: 20,
      body: 'I would now like to welcome the most distinguished Senator from
      Massachusetts, the chairman of the Health Subcommittee, Senator
      Kennedy.'  
    )
  
    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: 'Thank you very much, Mr. Chairman. We are
      delighted to join together in this very important area of public inquiry and public interest.'  
    )

    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: 'Some 2 years ago, the Senate Health Subcommittee heard chilling
      testimony about the human experimentation activities of the Central
      Intelligence Agency. The Deputy Director of the CIA revealed that
      over 30 universities and institutions were involved in an "extensive
      testing and experimentation" program which included covert drug
      tests on unwitting citizens "at all social levels, high and low, native
      Americans and foreign." Several of these tests involved the administration of LSD to "unwitting subjects in social situations."'  
    )

    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: 'At least one death, that of Dr. Olsen, resulted from these activities.
      The Afrency itself acknowledged that these tests made little scientific
      sense. The agents doing the monitoring were not qualified scientific
      observers. The test subjects were seldom accessible beyond the first
      hours of the test. In a number of instances, the test subject became ill
      for hours or days, and effective followup was impossible.'  
    )

    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: 'Other experiments were equally offensive. For example, heroin
      addicts were enticed into participating in LSD experiments in order
      to get a reward-heroin.'  
    )

    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: 'Perhaps most disturbing of all was the fact that the extent of experimentation on human subjects was unknown. The records of all
      these activities were destroyed in January 1973, at the instruction of
      then CIA Director Richard Helms. In spite of persistent inquiries by
      both the Health Subcommittee and the Intelligence Committee, no
      additional records or information were forthcoming. And no one single individual--could be found who remembered the details, not
      the Director of the CIA, who ordered the documents destroyed, not
      the official responsible for the program, nor any of his associates.'  
    )

    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: "We believed that the record, incomplete as it was, was as complete
      as it was going to be. Then one individual, through a Freedom of Information request, accomplished what two U.S. Senate committees
      could not. He spurred the agency into finding additional records pertaining to the CIA's program of experimentation with human subjects.
      These new records were discovered by the agency in March. Their
      existence was not made known to the Congress until July.' "
    )

    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: "The records reveal a far more extensive series of experiments than
      had previously been thought. Eighty-six universities or institutions
      were involved. NeV instances of unethical behavior were revealed."
    )
    
    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: "The intelligence community of this Nation, which requires a shroud
      of secrecy in order to operate, has a very sacred trust from the
      American people. The CIA's program of human experimentation of
      the fifties and sixties violated that trust. It was violated again on the
      day the bulk of the agency's records were destroyed in 1973. It is
      violated each time a responsible official refuses to recollect the details
      of the program. The best safeguard against abuses in the future is a
      complete public accounting of the abuses of the past."
    )
    
    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: "I think this is illustrated, as Chairman Inouye pointed out. These
      are issues, are questions that happened in the fifties and sixties, and
      go back some 15, 20 years ago, but they are front page news today, as
      we see in the major newspapers and on the television and in the media
      of this country; and the reason they are, I think, is because it just continuously begins to trickle out. sort of, month after month, and the
      best way to put this period behind us, obviously, is to have the full
      information, and I think that is the desire of Admiral Turner and of
      the members of this committee."
    )

    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: "The Central Intelligence Agency drugged American citizens without their knowledge or consent. It used university facilities and personnel without their knowledge. It funded leading researchers, often
      without their knowledge."
    )


    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: "These institutes, these individuals, have a right to know who they
      are and how and when they were used. As of today, the Agency itself
      refuses to declassify the names of those institutions and individuals,
      quite appropriately, I might say, with regard to the individuals under
      the Privacy Act. It seems to me to be a fundamental responsibility to
      notify those individuals or institutions, rather. I think many of them
      were caught up in an unwitting manner to do research for the
      Agency. Many researchers, distinguished researchers, some of our
      most outstanding members of our scientific community, involved in
      this network, now really do not know whether they were involved or
      not, and it seems to me that the whole health and climate in terms of
      our university and our scientific and health facilities are entitled to
      that response."
    )

    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: "So, I intend to do all I can to persuade the Agency to, at the very
      least, officially inform those institutions and individuals involved."
    )

    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: "Two years ago, when these abuses were first revealed, I introduced
      legislation, with Senator Schweiker and Senator Javits, designed to
      minimize the potential for any similar abuses in the future. That
      legislation expanded the jurisdiction of the National Commission on
      Human Subjects of Biomedical and Behavioral Research to cover all
      federally funded research involving human subjects. The research
      initially was just directed toward HEW activities, but this legislation
      covered DOD as well as the CIA."
    )

    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: "This Nation has a biomedical and behavioral research capability
      second to none. It has had for subjects of HEW funded research for
      the past 3 years a system for the protection of human subjects of biomedical and behavioral research second to none, and the Human Experimentation Commission has proven its value. Today's hearings
      and the record already established underscore the need to expand its
      jurisdiction."
    )

    Message.create(
      author_id: 4,
      server_id: 10,
      channel_id: 20,
      body: "The CIA supported that legislation in 1975, and it passed the Senate
      unanimously last year. I believe it is needed in order to assure all
      our people that they will have the degree of protection in.human experimentation that they deserve and have every right to expect."
    )

    Message.create(
      author_id: 3,
      server_id: 10,
      channel_id: 20,
      body: "Thank you very much. Now we will proceed with
      the hearings.. Admiral Turner?"
    )

    Message.create(
      author_id: 3,
      server_id: 10,
      channel_id: 20,
      body: "(Admiral Turner's prepared staement can be found in the channel titled 'admiral-turner-prepared-statement')"
    )

    puts "Seeding Friendships..."

    Friendship.create(
      sender_id: 3,
      receiver_id: 6
    )

    Friendship.create(
      sender_id: 3,
      receiver_id: 4
    )

    Friendship.create(
      sender_id: 3,
      receiver_id: 1
    )

    Friendship.create(
      sender_id: 3,
      receiver_id: 2
    )
    
    puts "Done!"
  end
